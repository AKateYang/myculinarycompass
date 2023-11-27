import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

const apiUrl = 'myculinarycompass-0c8901cce626.herokuapp.com';

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
  _NewsFeedPageState createState() => _NewsFeedPageState();
}

class _NewsFeedPageState extends State<NewsFeedPage> {
  List<Story> _stories = [];
  bool _loadingMore = false;
  int _currentPage = 1;

  @override
  void initState() {
    super.initState();
    _loadStories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('News Feed'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            // TODO: Implement back button functionality
          },
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
              return GestureDetector(
                onTap: () {
                  // TODO: Implement story click functionality
                },
                child: Card(
                  margin: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      Image.network(_stories[index].imageUrl),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          _stories[index].title,
                          style: const TextStyle(
                              fontSize: 18.0, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
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
    );
  }

  void _loadStories() async {
    // Replace the API URL with your actual API endpoint

    var url = Uri.http(apiUrl, 'recipes/getLazyLoadingRecipes');
    Map<String, String> headers = {'Content-type': 'application/json'};

    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      List<Story> stories = data.map((item) {
        return Story(
          id: item['_id'],
          title: item['recipeName'],
          imageUrl: 'https://via.placeholder.com/300',
        );
      }).toList();

      setState(() {
        _stories = stories;
      });
    } else {
      // Handle error
      print('Failed to load stories');
    }
  }

  void _loadMoreStories() async {
    setState(() {
      _loadingMore = true;
    });

    // Simulate loading more stories from an API or database
    await Future.delayed(const Duration(seconds: 2)); // Simulating a delay

    _currentPage++;

    // Fetch the next page of datavar url = Uri.http(apiUrl, 'recipes/getLazyLoadingRecipes');
    var url = Uri.http(apiUrl, 'recipes/getLazyLoadingRecipes');
    Map<String, String> headers = {'Content-type': 'application/json'};

    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      List<Story> newStories = data.map((item) {
        return Story(
          id: item['_id'],
          title: item['recipeName'],
          imageUrl: 'https://via.placeholder.com/300',
        );
      }).toList();

      setState(() {
        _stories.addAll(newStories);
        _loadingMore = false;
      });
    } else {
      // Handle error
      print('Failed to load more stories');
      setState(() {
        _loadingMore = false;
      });
    }
  }
}

class Story {
  final String id;
  final String title;
  final String imageUrl;

  Story({required this.id, required this.title, required this.imageUrl});
}
