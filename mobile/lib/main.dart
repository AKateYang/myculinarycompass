import 'package:flutter/material.dart';

import 'pages/login-page.dart';
import 'pages/grocery.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "Exploration!",
      home: ShoppingListScreen(),
    );
  }
}
