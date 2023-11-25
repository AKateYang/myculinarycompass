import 'package:flutter/material.dart';

class Test extends StatelessWidget {
  const Test({super.key});

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
  final List<Story> _stories = List.generate(6, (index) => Story(index));
  bool _loadingMore = false;

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

  void _loadMoreStories() async {
    setState(() {
      _loadingMore = true;
    });

    // Simulate loading more stories from an API or database
    await Future.delayed(const Duration(seconds: 2));
    List<Story> newStories =
        List.generate(3, (index) => Story(_stories.length + index));
    setState(() {
      _stories.addAll(newStories);
      _loadingMore = false;
    });
  }
}

class Story {
  final int id;
  final String title;
  final String imageUrl;

  Story(this.id)
      : title = 'Story $id',
        imageUrl =
            'https://via.placeholder.com/300'; // Replace with actual image URL
}
