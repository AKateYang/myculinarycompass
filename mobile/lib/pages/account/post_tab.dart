import 'package:flutter/material.dart';
import 'package:mobile/widgets/make_post.dart';

class PostTab extends StatelessWidget {
  final List<String> userPosts = [];

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Expanded(
        child: ListView.builder(
            itemCount: 5,
            itemBuilder: (context, index) {
              return UserPosts(
                name: "test name",
              );
            }),
      ),
    );
  }
}
