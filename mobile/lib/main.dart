import 'package:flutter/material.dart';

import 'pages/login-page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "Exploration!",
      home: LoginPage(),
    );
  }
}
