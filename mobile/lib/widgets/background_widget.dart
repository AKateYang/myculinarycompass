import 'package:flutter/material.dart';

// This widget can be used on other pages to set the background.
// Checkout login.dart for For reference on how to use BackgroundImageWidget()
class BackgroundImageWidget extends StatelessWidget {
  final Widget child;
  final ImageProvider image;

  const BackgroundImageWidget({
    Key? key,
    required this.image,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: image,
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Colors.black.withOpacity(0.3),
              BlendMode.darken,
            ),
          ),
        ),
        child: child,
      );
}
