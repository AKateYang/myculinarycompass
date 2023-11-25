import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Test2 extends StatefulWidget {
  const Test2({super.key});

  @override
  _Test2State createState() => _Test2State();
}

class _Test2State extends State<Test2> {
  // Placeholder URL for the recipe image
  final String placeholderImagePath = 'https://example.com/placeholder.jpg';

  // Function to fetch data from the API
  Future<Map<String, dynamic>> fetchRecipeData() async {
    // Replace 'API_ENDPOINT' with the actual endpoint of your API
    final response = await http.get(Uri.parse('API_ENDPOINT'));

    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON
      return json.decode(response.body);
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to load recipe details');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Recipe Details',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.black,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: FutureBuilder(
        future: fetchRecipeData(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.data == null) {
            return const Center(child: Text('No data available'));
          } else {
            // Extract data from the API response
            final recipeName = snapshot.data!['recipeName'];
            final ingredients =
                List<String>.from(snapshot.data!['ingredients'] ?? []);
            final instructions = snapshot.data!['instructions'] ?? '';
            final picturePath = placeholderImagePath;

            return Container(
              color: Colors.black,
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 200,
                    width: double.infinity,
                    color: Colors.grey,
                    child: const Center(
                      child: Text(
                        'Recipe Image', // Use the placeholder image
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Text(
                    recipeName ?? 'Unknown Recipe',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  const Text(
                    'Ingredients:',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  // Display the list of ingredients
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: ingredients
                        .map((ingredient) => Text(
                              ingredient,
                              style: const TextStyle(color: Colors.white),
                            ))
                        .toList(),
                  ),
                  const SizedBox(height: 16.0),
                  const Text(
                    'Instructions:',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  // Display the instructions
                  Text(
                    instructions,
                    style: const TextStyle(color: Colors.white),
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
