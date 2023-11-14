import 'package:flutter/material.dart';
import 'dart:ui';

class OpaqueBox extends StatelessWidget {
  final double width;
  final double height;
  final List<Widget>? children;

  const OpaqueBox({
    Key? key,
    required this.width,
    required this.height,
    required this.children,
  }) : super(key:key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.3), // Adjust opacity as needed
        borderRadius: BorderRadius.circular(8.0), // Optional: Add border radius
      ),
      child: ClipRRect(
          borderRadius: BorderRadius.circular(8.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 5.0, sigmaY: 5.0),
            child: Container(
              color: Colors.white.withOpacity(0.5),
              child: children != null
                    ? Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: children!,
                      )
                    : null,
              ),
            ),
        ),
      ),
    );
  }
}