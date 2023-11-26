import 'package:flutter/material.dart';
import 'package:mobile/widgets/liked_posts.dart';

class LikedTab extends StatelessWidget {
  final List<String> userPosts = [];

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Expanded(
        child: ListView.builder(
            itemCount: 5,
            itemBuilder: (context, index) {
              return LikedPosts(
                name: "test name",
              );
            }),
      ),
    );
  }
}
