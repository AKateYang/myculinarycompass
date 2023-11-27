import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Recipe {
  final List<String> recipeName;
  final List<String> picturePath;

  Recipe({required this.recipeName, required this.picturePath});
}

class SavedRecipes extends StatefulWidget {
  @override
  _SavedRecipesState createState() => _SavedRecipesState();
}

class _SavedRecipesState extends State<SavedRecipes> {
  late Future<Recipe> _postsFuture;
  late Future<Recipe> _savedRecipe;
  @override
  void initState() {
    super.initState();
    // Call the function to fetch recipes when the widget is initialized
    _postsFuture = _fetchRecipes();
    _savedRecipe = _fetchSavedRecipes();
  }

  Future<Recipe> _fetchRecipes() async {
    // Replace the API URL with your actual API endpoint
    const apiUrl =
        "https://myculinarycompass-0c8901cce626.herokuapp.com/recipes/getallmobile";

    try {
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        // Check if response.body is not null
        final List<dynamic> data = json.decode(response.body);

        final List<String> imageUrls = data
            .map((post) => post['picturePath'] as String?)
            .where((filePath) => filePath != null)
            .cast<String>()
            .toList();
        final List<String> recipeNames = data
            .map((post) => post['recipeName'] as String?)
            .where((name) => name != null)
            .cast<String>()
            .toList();

        return Recipe(picturePath: imageUrls, recipeName: recipeNames);
      } else {
        throw Exception(
            'Failed to load recipes. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error: $error');
      throw Exception('Failed to load recipes');
    }
  }

  final String addr = 'https://myculinarycompass-0c8901cce626.herokuapp.com';

  Future<Recipe> _fetchSavedRecipes() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('user_data');
    // Use final instead of const for variables determined at runtime
    final String addr = 'https://myculinarycompass-0c8901cce626.herokuapp.com';

    if (userDataString != null) {
      try {
        Map<String, dynamic> userData = jsonDecode(userDataString);
        Map<String, String> headers = {'Content-type': 'application/json'};
        // Use final instead of const for variables determined at runtime
        final userId = userData['id'];

        final apiUrl = Uri.http(addr, 'recipes/getUserRecipe/$userId');

        final response = await http.get(apiUrl, headers: headers);

        if (response.statusCode == 200) {
          // Check if response.body is not null
          final List<dynamic> data = json.decode(response.body);

          final List<String> imageUrls = data
              .map((post) => post['picturePath'] as String?)
              .where((filePath) => filePath != null)
              .cast<String>()
              .toList();
          final List<String> recipeNames = data
              .map((post) => post['recipeName'] as String?)
              .where((name) => name != null)
              .cast<String>()
              .toList();

          return Recipe(picturePath: imageUrls, recipeName: recipeNames);
        } else {
          throw Exception(
              'Failed to load recipes. Status code: ${response.statusCode}');
        }
      } catch (error) {
        print('Error: $error');
        throw Exception('Failed to load recipes');
      }
    }
    throw Exception('Failed to load recipes');
  }

  Future<List<String>> fetchSavedRecipes() async {
    // Replace the API URL with your actual API endpoint
    const apiUrl =
        "https://myculinarycompass-0c8901cce626.herokuapp.com/recipes/";

    try {
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        // Check if response.body is not null
        final List<dynamic> data = json.decode(response.body);

        final List<String> imageUrls = data
            .map((post) => post['picturePath'] as String?)
            .where((filePath) => filePath != null)
            .cast<String>()
            .toList();

        return imageUrls;
      } else {
        throw Exception(
            'Failed to load recipes. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error: $error');
      throw Exception('Failed to load recipes');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Hello!'),
        ),
        body: Padding(
          padding: const EdgeInsets.only(top: 40),
          child: Column(
            children: [
              // Saved Recipes
              Padding(
                padding: const EdgeInsets.only(left: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      child: Text(
                        "Recommended Recipes:",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                height: 200,
                child: FutureBuilder<Recipe>(
                  future: _fetchRecipes(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else if (!snapshot.hasData) {
                      return Center(child: Text('No data available.'));
                    } else {
                      Recipe recipeData = snapshot.data!;

                      return ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: recipeData.recipeName.length,
                        itemBuilder: (context, index) {
                          return RecipeCard(
                            imageUrl: recipeData.picturePath[index],
                            recipeName: recipeData.recipeName[index],
                          );
                        },
                      );
                    }
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 8.0, top: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      child: Text(
                        "Saved Recipes:",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                height: 400,
                child: FutureBuilder<Recipe>(
                  future: _fetchRecipes(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else if (!snapshot.hasData) {
                      return Center(child: Text('No data available.'));
                    } else {
                      Recipe recipeData = snapshot.data!;

                      return GridView.builder(
                        // scrollDirection: Axis.horizontal,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 3,
                            crossAxisSpacing:
                                8.0, // Adjust the spacing between columns
                            mainAxisSpacing: 25,
                            childAspectRatio:
                                0.75 // Adjust the spacing between rows
                            ),
                        itemCount: recipeData.recipeName.length,

                        itemBuilder: (context, index) {
                          return RecipeCard(
                            imageUrl: recipeData.picturePath[index],
                            recipeName: recipeData.recipeName[index],
                          );
                        },
                      );
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class RecipeCard extends StatelessWidget {
  final String imageUrl;
  final String recipeName;
  static const String backendUrl =
      'https://myculinarycompass-0c8901cce626.herokuapp.com/assets';

  RecipeCard({required this.imageUrl, required this.recipeName});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.network(
            '$backendUrl/$imageUrl',
            width: 170,
            height: 110,
            fit: BoxFit.cover,
          ),
          Padding(
            padding: EdgeInsets.all(8),
            child: Text(
              recipeName,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
