import 'package:flutter/material.dart';
import 'package:mobile/palette.dart';
import 'package:mobile/widgets/background_widget.dart';
import 'package:mobile/widgets/inputbox_widget.dart';
import 'package:mobile/widgets/signupbutton_widget.dart';
import 'package:mobile/widgets/white_box_widget.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        BackgroundImageWidget(
          image: AssetImage('assets/landing.jpg'),
          child: Scaffold(
            backgroundColor: Colors.transparent,
            body: SafeArea(
              child: OpaqueBox(
                width: 380.0,
                height: 540.0,
                children: [
                  Container(
                    height: 100,
                    child: const Center(
                      child: Text(
                        'Sign Up!',
                        style: landHeading,
                      ),
                    ),
                  ),
                  const InputBoxWidget(
                    hintname: "First Name",
                    hintStyle: landBodyText,
                    inputType: TextInputType.text,
                    inputAction: TextInputAction.next,
                    isHide: false),
                  const InputBoxWidget(
                    hintname: "Last Name",
                    hintStyle: landBodyText,
                    inputAction: TextInputAction.next,
                    inputType: TextInputType.text,
                    isHide: true),
                  const InputBoxWidget(
                    hintname: "Username",
                    hintStyle: landBodyText,
                    inputType: TextInputType.text,
                    inputAction: TextInputAction.next,
                    isHide: true),
                  const InputBoxWidget(
                    hintname: "Password",
                    hintStyle: landBodyText,
                    inputAction: TextInputAction.next,
                    inputType: TextInputType.text,
                    isHide: true),
                  const SignUpButtonWidget(
                    hintname: "Sign Up",
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}