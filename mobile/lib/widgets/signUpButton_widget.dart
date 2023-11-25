import 'package:flutter/material.dart';

// void main() {
//   runApp(MyApp());
// }

class SignUpButtonWidget extends StatelessWidget {
  final String hintname;

  const SignUpButtonWidget({
    Key? key,
    required this.hintname,
  }) : super(key:key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Handle button click here
        print('Welcome');
      },
      child: Container(
        width: 150, // Adjust the width as needed
        height: 30, // Adjust the height as needed
        decoration: BoxDecoration(
          color: const Color.fromARGB(255, 15, 22, 15),
          borderRadius: BorderRadius.circular(15), // Half of the height for an oval shape
        ),
        child: const Center(
          child: Text(
            'Sign Up',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
