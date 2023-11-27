import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Recipe {
  final String recipeName;
  final String picturePath;

  Recipe({required this.recipeName, required this.picturePath});
}

class SavedRecipes extends StatefulWidget {
  @override
  _SavedRecipesState createState() => _SavedRecipesState();
}

class _SavedRecipesState extends State<SavedRecipes> {
  List<Recipe> suggestedRecipes = [];
  List<Recipe> savedRecipes = [];

  @override
  void initState() {
    super.initState();
    // Call the function to fetch recipes when the widget is initialized
    _fetchRecipes();
  }

  Future<void> _fetchRecipes() async {
    // Replace the API URL with your actual API endpoint
    // const apiUrl =
    //     'https://myculinarycompass-0c8901cce626.herokuapp.com/recipes';
    const apiUrl = "http://10.0.2.2:5000/recipes/";

    try {
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        // Check if response.body is not null
        if (response.body != null) {
          // If the server returns a 200 OK response, parse the data
          Map<String, dynamic> data = jsonDecode(response.body);

          setState(() {
            suggestedRecipes =
                (data["suggested"] as List<dynamic> ?? []).map((item) {
              return Recipe(
                recipeName: item["recipeName"],
                picturePath: item["picturePath"],
              );
            }).toList();
            savedRecipes = (data["saved"] as List<dynamic> ?? []).map((item) {
              return Recipe(
                recipeName: item["recipeName"],
                picturePath: item["picturePath"],
              );
            }).toList();
          });
        } else {
          // If response.body is null, handle the error accordingly
          throw Exception('Failed to load recipes. Response body is null.');
        }
      } else {
        // If the server did not return a 200 OK response,
        // throw an exception or handle the error accordingly
        throw Exception(
            'Failed to load recipes. Status code: ${response.statusCode}');
      }
    } catch (error) {
      // Handle any other errors that might occur during the HTTP request
      print('Error: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Horizontal Recipe List'),
        ),
        body: Padding(
          padding: const EdgeInsets.only(top: 80),
          child: Column(
            children: [
              // Suggested Recipes
              Padding(
                padding: const EdgeInsets.only(left: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      child: Text(
                        "Suggested Recipes:",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 18),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 60.0),
                child: Container(
                  height: 200,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: suggestedRecipes.length,
                    itemBuilder: (context, index) {
                      return RecipeCard(recipe: suggestedRecipes[index]);
                    },
                  ),
                ),
              ),

              // Saved Recipes
              Padding(
                padding: const EdgeInsets.only(left: 8.0),
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
                height: 200,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: savedRecipes.length,
                  itemBuilder: (context, index) {
                    return RecipeCard(recipe: savedRecipes[index]);
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
  final Recipe recipe;
  // static const String backendUrl =
  //     'https://myculinarycompass-0c8901cce626.herokuapp.com/assets';

  static const String backendUrl = 'http://10.0.2.2:5000/assets';

  RecipeCard({required this.recipe});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.network(
            '$backendUrl/${recipe.picturePath}',
            width: 170,
            height: 100,
            fit: BoxFit.cover,
          ),
          Padding(
            padding: EdgeInsets.all(8),
            child: Text(
              recipe.recipeName,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
