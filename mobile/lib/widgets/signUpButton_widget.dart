import 'package:flutter/material.dart';

// void main() {
//   runApp(MyApp());
// }

class signUpButtonWidget extends StatelessWidget {
  @override
  final String hintname;

  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: hintname,
        ),
        body: Center(
          child: OvalButton(),
        ),
      ),
    );
  }
}

class OvalButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Handle button click here
        print('Button Clicked');
      },
      child: Container(
        width: 150, // Adjust the width as needed
        height: 60, // Adjust the height as needed
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(30), // Half of the height for an oval shape
        ),
        child: Center(
          child: Text(
            'Click Me',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
