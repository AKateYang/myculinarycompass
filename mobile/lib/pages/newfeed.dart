import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io';

class News extends StatelessWidget {
  const News({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const NewsFeedPage(),
    );
  }
}

class NewsFeedPage extends StatefulWidget {
  const NewsFeedPage({super.key});

  @override
  _NewsFeedPage createState() => _NewsFeedPage();
}

class _NewsFeedPage extends State<NewsFeedPage> {
  List<Story> _stories = [];
  Set<String> _loadedStoryIds = {};
  bool _loadingMore = false;
  int _currentPage = 1;
  String currentId = "";

  static const String backendUrl =
      'https://myculinarycompass-0c8901cce626.herokuapp.com/assets';

  @override
  void initState() {
    super.initState();
    setUser();
    _loadStories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My Culinary Feed',
          textAlign: TextAlign.center,
        ),
      ),
      body: NotificationListener<ScrollNotification>(
        onNotification: (ScrollNotification scrollInfo) {
          if (!_loadingMore &&
              scrollInfo.metrics.pixels == scrollInfo.metrics.maxScrollExtent) {
            _loadMoreStories();
            return true;
          }
          return false;
        },
        child: ListView.builder(
          itemCount: _stories.length + 1,
          itemBuilder: (context, index) {
            if (index < _stories.length) {
              return Card(
                margin: const EdgeInsets.all(8.0),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8.0),
                      alignment: Alignment.center,
                      child: Row(
                        children: [
                          SizedBox(width: 8.0),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _stories[index].userName,
                                style: const TextStyle(
                                  fontSize: 18.0,
                                  fontWeight: FontWeight.bold,
                                ),
                                textAlign: TextAlign.left,
                              ),
                              Container(
                                height: 2.0,
                                color: Colors.black,
                              ),
                            ],
                          ),
                          SizedBox(width: 125.0),
                          if (currentId != _stories[index].userId)
                            ElevatedButton(
                              onPressed: () {
                                _becomeFollower(_stories[index]);
                              },
                              child: Text(
                                style: TextStyle(
                                  color: Colors
                                      .green, // Set the text color of the button
                                ),
                                _stories[index].isFollowing
                                    ? '- Unfollow'
                                    : '+ Follow',
                              ),
                            ),
                        ],
                      ),
                    ),
                    Image.network('$backendUrl/${_stories[index].picturePath}'),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            IconButton(
                              icon: Icon(
                                _stories[index].isLiked
                                    ? Icons.favorite
                                    : Icons.favorite_border,
                                color:
                                    _stories[index].isLiked ? Colors.red : null,
                              ),
                              onPressed: () {
                                setState(() {
                                  _stories[index].isLiked =
                                      !_stories[index].isLiked;
                                });
                                _likePost(_stories[index].id);
                                // TODO: Implement like functionality
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.comment),
                              onPressed: () {
                                _showCommentsPopup(_stories[index]);
                                // TODO: Implement comments functionality
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.open_in_new),
                              onPressed: () {
                                _openRecipePopup(_stories[index].id, index);
                                // TODO: Implement redirection functionality
                              },
                            ),
                          ],
                        ),
                        IconButton(
                          icon: Icon(
                            _stories[index].isBookmarked
                                ? Icons.bookmark
                                : Icons.bookmark_border,
                            color: _stories[index].isBookmarked
                                ? Colors.yellow
                                : null,
                          ),
                          onPressed: () {
                            setState(() {
                              _stories[index].isBookmarked =
                                  !_stories[index].isBookmarked;
                            });
                            _saveRecipe(_stories[index].id);
                            // TODO: Implement save functionality
                          },
                        ),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        _stories[index].title,
                        style: const TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            } else {
              return _loadingMore
                  ? const Center(child: CircularProgressIndicator())
                  : Container();
            }
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showCreateRecipePopup();
        },
        child: Icon(Icons.add),
      ),
    );
  }

  void _saveRecipe(String postId) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('user_data');

    if (userDataString != null) {
      Map<String, dynamic> userData = jsonDecode(userDataString);
      var userId = userData['id'];

      final apiUrl =
          'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/savePost/$userId/$postId';

      try {
        final response = await http.patch(Uri.parse(apiUrl));

        if (response.statusCode == 200) {
          // Post liked successfully, you may want to update the UI accordingly
          print('Recipe from post saved!');
        } else {
          // Handle error
          print('Failed to save recipe!');
        }
      } catch (error) {
        // Handle network or other errors
        print('Error: $error');
      }
    }
  }

  void _likePost(String postId) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('user_data');

    if (userDataString != null) {
      Map<String, dynamic> userData = jsonDecode(userDataString);
      var userId = userData['id'];

      // Replace the API URL with your actual API endpoint
      final apiUrl =
          'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/$postId/like';

      try {
        final response = await http.patch(
          Uri.parse(apiUrl),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode({'userId': userId}),
        );

        if (response.statusCode == 200) {
          // Post liked successfully, you may want to update the UI accordingly
          print('Post liked successfully');
        } else {
          // Handle error
          print('Failed to like the post');
        }
      } catch (error) {
        // Handle network or other errors
        print('Error: $error');
      }
    }
  }

  void _showCommentsPopup(Story story) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Comments'),
          content: Container(
            width: MediaQuery.of(context).size.width * 0.8,
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Display existing comments with lines between them
                  for (int i = 0; i < story.comments.length; i++)
                    Column(
                      crossAxisAlignment: CrossAxisAlignment
                          .start, // Align comments to the left
                      children: [
                        Text(story.comments[i]),
                        if (i < story.comments.length - 1) Divider(),
                      ],
                    ),

                  // Add a line after the last comment
                  if (story.comments.isNotEmpty) Divider(),

                  // Add a text field for new comments
                  TextField(
                    decoration: InputDecoration(labelText: 'Add a comment'),
                    onSubmitted: (comment) {
                      _addComment(story, story.id, comment);
                      Navigator.of(context).pop(); // Close the popup
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  void _addComment(Story story, String postId, String comment) async {
    final apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/addComment/$postId';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({'comment': comment}),
      );

      if (response.statusCode == 200) {
        _reloadComments(story, postId);

        print('Comment added successfully');
      } else {
        print('Failed to add comment');
      }
    } catch (error) {
      print('Error: $error');
    }
  }

  Future<void> _reloadComments(Story story, String postId) async {
    final apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/getComments/$postId';
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      List<String> comments = data.cast<String>().toList();

      // Update the story with loaded comments
      setState(() {
        story.comments = comments;
      });
    } else {
      // Handle error
      print('Failed to load comments for story ${story.id}');
    }
  }

  void _loadStories() async {
    // Replace the API URL with your actual API endpoint
    const apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/lazyLoading/getLazyLoadingPosts';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({'pageNumber': _currentPage}),
      );

      if (response.statusCode == 200) {
        _currentPage++;
        List<dynamic> data = jsonDecode(response.body);
        List<Story> stories = data.map((item) {
          return Story(
            userId: item['userId'],
            userName: item["firstName"] + " " + item["lastName"],
            id: item['_id'],
            title: item['caption'],
            picturePath: item['picturePath'],
            comments: [], // Initialize comments list
          );
        }).toList();

        // Filter out already loaded story IDs
        stories = stories
            .where((story) => !_loadedStoryIds.contains(story.id))
            .toList();

        // Load only the first 5 unique stories initially
        setState(() {
          _stories = stories.take(5).toList();
          _loadedStoryIds.addAll(_stories.map((story) => story.id));
        });

        // Fetch comments for each story
        for (var story in _stories) {
          await _loadCommentsForStory(story);
        }
      } else {
        // Handle error
        print('Failed to load stories');
      }
    } catch (error) {
      // Handle network or other errors
      print('Error: $error');
    }
  }

  Future<void> _loadCommentsForStory(Story story) async {
    final apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/getComments/${story.id}';
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      List<String> comments = data.cast<String>().toList();

      // Update the story with loaded comments
      setState(() {
        story.comments = comments;
      });
    } else {
      // Handle error
      print('Failed to load comments for story ${story.id}');
    }
  }

  void _loadMoreStories() async {
    setState(() {
      _loadingMore = true;
    });

    // Simulate loading more stories from an API or database
    await Future.delayed(const Duration(seconds: 2)); // Simulating a delay

    // Fetch the next page of data
    const apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/lazyLoading/getLazyLoadingPosts';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({'pageNumber': _currentPage}),
      );

      _currentPage++;

      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        List<Story> newStories = data.map((item) {
          return Story(
            userId: item['userId'],
            userName: item["firstName"] + " " + item["lastName"],
            id: item['_id'],
            title: item['caption'],
            picturePath: item['picturePath'],
            comments: [],
          );
        }).toList();

        // Filter out already loaded story IDs
        newStories = newStories
            .where((story) => !_loadedStoryIds.contains(story.id))
            .toList();

        // Load the next 5 unique stories
        setState(() {
          _stories.addAll(newStories.take(5));
          _loadedStoryIds.addAll(newStories.map((story) => story.id));
          _loadingMore = false;
        });

        for (var story in _stories) {
          await _loadCommentsForStory(story);
        }
      } else {
        // Handle error
        print('Failed to load more stories');
        setState(() {
          _loadingMore = false;
        });
      }
    } catch (error) {
      // Handle network or other errors
      print('Error: $error');
    }
  }

  void _openRecipePopup(String postId, int index) async {
    // Fetch the recipeId for the given postId
    final recipeIdUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/getRecipeId/$postId';
    final recipeIdResponse = await http.get(Uri.parse(recipeIdUrl));

    if (recipeIdResponse.statusCode == 200) {
      final recipeId = jsonDecode(recipeIdResponse.body);

      // Fetch the detailed recipe using the obtained recipeId
      final recipeUrl =
          'https://myculinarycompass-0c8901cce626.herokuapp.com/recipes/getRecipe/$recipeId';
      final recipeResponse = await http.get(Uri.parse(recipeUrl));

      if (recipeResponse.statusCode == 200) {
        final Map<String, dynamic> recipeData = jsonDecode(recipeResponse.body);
        final Recipe recipe = Recipe.fromJson(recipeData);

        // Display the recipe details in a popup
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(recipe.recipeName),
              content: Container(
                width: MediaQuery.of(context).size.width *
                    0.9, // Adjust the width factor
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Image.network(
                        '$backendUrl/${_stories[index].picturePath}', // Use the imageUrl from the story
                        fit: BoxFit.cover, // Adjust the fit as needed
                      ),
                      SizedBox(
                          height: 8), // Add some space between image and text
                      Text(
                        'Recipe Name:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(recipe.recipeName, style: TextStyle(fontSize: 16)),
                      Divider(),
                      Text(
                        'Time to Make:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(recipe.timeToMake, style: TextStyle(fontSize: 16)),
                      Divider(),
                      Text(
                        'Ingredients:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        recipe.ingredients.join(', '),
                        style: TextStyle(fontSize: 16),
                      ),
                      Divider(),
                      Text(
                        'Description:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(recipe.description, style: TextStyle(fontSize: 16)),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      } else {
        // Handle error
        print('Failed to fetch recipe details');
      }
    } else {
      // Handle error
      print('Failed to fetch recipeId');
    }
  }

  void _showCreateRecipePopup() {
    RecipeCreateData recipeCreateData = RecipeCreateData();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Create Recipe'),
          content: Container(
            width: MediaQuery.of(context).size.width * 0.8,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  TextField(
                    decoration: InputDecoration(labelText: 'Recipe Name'),
                    onChanged: (value) {
                      recipeCreateData.recipeName = value;
                    },
                  ),
                  TextField(
                    decoration: InputDecoration(
                        labelText: 'Ingredients (comma separated)'),
                    onChanged: (value) {
                      recipeCreateData.ingredients =
                          value.split(',').map((e) => e.trim()).toList();
                    },
                  ),
                  TextField(
                    decoration: InputDecoration(labelText: 'Instructions'),
                    onChanged: (value) {
                      recipeCreateData.instructions = value;
                    },
                  ),
                  TextField(
                    decoration:
                        InputDecoration(labelText: 'Time to Make In Minutes'),
                    onChanged: (value) {
                      var value2 = value + " minutes";
                      recipeCreateData.timeToMake = value2;
                    },
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      Navigator.of(context).pop();
                      String recipeId = await _createRecipe(recipeCreateData);
                      _showCreatePostPopup(recipeId);
                    },
                    child: Text('Next'),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Future<String> _createRecipe(RecipeCreateData recipeData) async {
    // const apiUrl = 'https://myculinarycompass-0c8901cce626.herokuapp.com/recipes/createRecipe';

    // try {
    //   final response = await http.post(
    //     Uri.parse(apiUrl),
    //     headers: <String, String>{
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     body: jsonEncode({
    //       'recipeName': recipeData.recipeName,
    //       'ingredients': recipeData.ingredients,
    //       'picturePath': '', // Leave it blank for now
    //       'instructions': recipeData.instructions,
    //       'timeToMake': recipeData.timeToMake,
    //     }),
    //   );

    //   if (response.statusCode == 200) {
    //     final Map<String, dynamic> responseData = jsonDecode(response.body);
    //     print('Recipe created successfully');
    //     return responseData["_id"];
    //     // Use responseData to get recipeId for the next step if needed
    //   } else {
    //     // Handle error
    //     print('Failed to create recipe');
    //   }
    // } catch (error) {
    //   // Handle network or other errors
    //   print('Error: $error');
    //   throw Exception("damn son");
    // }

    var url = Uri.http(
        'myculinarycompass-0c8901cce626.herokuapp.com', 'recipes/createRecipe');
    final response = await http.post(url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'recipeName': recipeData.recipeName,
          'ingredients': recipeData.ingredients,
          'picturePath': '', // Leave it blank for now
          'instructions': recipeData.instructions,
          'timeToMake': recipeData.timeToMake,
        }));
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = jsonDecode(response.body);
      print('Recipe created successfully');
      return responseData["_id"];
    } else {
      throw Exception('Failed to fetch user data');
    }
  }

  void _showCreatePostPopup(String recipeId) async {
    PostCreateData postData = PostCreateData();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('user_data');

    if (userDataString != null) {
      Map<String, dynamic> userData = jsonDecode(userDataString);
      var UserId = userData['id'];
      var FirstName = userData['firstName'];
      var LastName = userData['lastName'];

      postData.userId = UserId;
      postData.firstName = FirstName;
      postData.lastName = LastName;
    }

    File? imageName;
    File? image;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Create Post'),
          content: Container(
            width: MediaQuery.of(context).size.width * 0.8,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  ElevatedButton(
                    onPressed: () async {
                      File? image = await _pickImage();
                      if (image != null) {
                        setState(() {
                          imageName = image;
                          postData.picturePath =
                              getLastSegment(imageName!.path);
                        });
                      }
                    },
                    child: Text('Select Image'),
                  ),
                  if (image != null)
                    Image.file(image!, height: 100, width: 100),
                  TextField(
                    decoration: InputDecoration(labelText: 'Caption'),
                    onChanged: (value) {
                      postData.caption = value;
                    },
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      Navigator.of(context).pop();
                      await _createPost(postData, recipeId, imageName, image);
                    },
                    child: Text('Create Post'),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  String getLastSegment(String inputString) {
    List<String> segments = inputString.split('/');

    // Check if there is more than one segment
    if (segments.length > 1) {
      // Return the last segment
      return segments.last;
    } else {
      // If there is only one segment, return the original string
      return inputString;
    }
  }

  Future<void> _createPost(PostCreateData postData, String recipeId,
      File? selectedImage, File? image) async {
    const apiUrl =
        'https://myculinarycompass-0c8901cce626.herokuapp.com/posts/createPost';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'userId': postData
              .userId, // You may need to set this value based on your authentication
          'firstName': postData
              .firstName, // You may need to set this value based on your authentication
          'lastName': postData
              .lastName, // You may need to set this value based on your authentication
          'recipeId':
              recipeId, // Use the recipeId obtained from the previous step
          'caption': postData.caption,
          'picturePath': postData.picturePath, // Leave it blank for now
        }),
      );

      if (response.statusCode == 200) {
        // Post created successfully
        print('Post created successfully');
      } else {
        // Handle error
        print('Failed to create post');
      }
    } catch (error) {
      // Handle network or other errors
      print('Error: $error');
    }
  }

  void _becomeFollower(Story story) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('user_data');

    if (userDataString != null) {
      Map<String, dynamic> userData = jsonDecode(userDataString);
      var id = userData['id'];

      var postId = story.id;

      final postUrl = "http://10.0.2.2:5000/posts/getPost/$postId";

      final Response_post = await http.get(Uri.parse(postUrl));

      if (Response_post.statusCode == 200) {
        Map<String, dynamic> postData = jsonDecode(Response_post.body);

        var userId = postData["userId"];

        final apiUrl = "http://10.0.2.2:5000/users/$id/$userId";

        final Response = await http.patch(Uri.parse(apiUrl));

        if (Response.statusCode == 200) {
          story.isFollowing = !story.isFollowing; // Toggle the follow state

          print("You followed someone!");
        } else {
          // Handle error
          print('Failed to follow user');
        }
      } else {
        // Handle error
        print('Failed to follow user');
      }
    }
  }

  void setUser() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? userDataString = prefs.getString('user_data');

    if (userDataString != null) {
      Map<String, dynamic> userData = jsonDecode(userDataString);
      var id = userData['id'];

      currentId = id;
    }
  }

  Future<File?> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      return File(pickedFile.path);
    } else {
      return null;
    }
  }
}

class Story {
  final String userName;
  final String userId;
  final String id;
  final String title;
  final String picturePath;
  bool isLiked;
  bool isBookmarked;
  List<String> comments;
  bool isFollowing;

  Story({
    required this.userName,
    required this.userId,
    required this.id,
    required this.title,
    required this.picturePath,
    this.isLiked = false,
    this.isBookmarked = false,
    this.isFollowing = false,
    this.comments = const [],
  });
}

class Recipe {
  final String recipeId;
  final String recipeName;
  final String timeToMake;
  final List<String> ingredients;
  final String description;

  Recipe({
    required this.recipeId,
    required this.recipeName,
    required this.timeToMake,
    required this.ingredients,
    required this.description,
  });

  factory Recipe.fromJson(Map<String, dynamic> json) {
    return Recipe(
      recipeId: json['_id'],
      recipeName: json['recipeName'],
      timeToMake: json['timeToMake'],
      ingredients: List<String>.from(json['ingredients']),
      description: json['instructions'],
    );
  }
}

class RecipeCreateData {
  late String recipeName;
  late List<String> ingredients;
  late String instructions;
  late String timeToMake;
}

class PostCreateData {
  late String caption;
  late String userId;
  late String firstName;
  late String lastName;
  late String picturePath;
}
