import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

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
                    Image.network(_stories[index].imageUrl),
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
                                // TODO: Implement like functionality
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.comment),
                              onPressed: () {
                                // TODO: Implement comments functionality
                              },
                            ),
                            IconButton(
                              icon: Icon(Icons.open_in_new),
                              onPressed: () {
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
    );
  }

  void _loadStories() async {
    // Replace the API URL with your actual API endpoint
    const apiUrl = 'http://10.0.2.2:5000/recipes/getLazyLoadingRecipes';

    final response = await http.get(Uri.parse(apiUrl));

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

    // Fetch the next page of data
    const apiUrl = 'http://10.0.2.2:5000/recipes/getLazyLoadingRecipes/';

    final response = await http.get(Uri.parse(apiUrl));

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
  bool isLiked;
  bool isBookmarked;

  Story({
    required this.id,
    required this.title,
    required this.imageUrl,
    this.isLiked = false,
    this.isBookmarked = false,
  });
}
