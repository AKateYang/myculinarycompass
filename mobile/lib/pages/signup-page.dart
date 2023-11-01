import 'package:flutter/material.dart';
import 'package:mobile/palette.dart';
import 'package:mobile/widgets/background_widget.dart';
import 'package:mobile/widgets/inputbox_widget.dart';

class SignUpPage extends StatefulWidget {
  const SightUpPage({super.key});

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
              child: Column(
                children: [
                  Container(
                    height: 200,
                    child: Center(
                      child: Text(
                        'My Culinary\n  Compass',
                        style: landHeading,
                      ),
                    ),
                  ),
                  InputBoxWidget(
                    hintname: "First Name",
                    hintStyle: landBodyText,
                    inputType: TextInputType.text,
                    inputAction: TextInputAction.next,
                    isHide: false),
                  InputBoxWidget(
                    hintname: "Last Name",
                    hintStyle: landBodyText,
                    inputAction: TextInputAction.next,
                    inputType: TextInputType.text,
                    isHide: true),
                  InputBoxWidget(
                    hintname: "First Name",
                    hintStyle: landBodyText,
                    inputType: TextInputType.text,
                    inputAction: TextInputAction.next,
                    isHide: false),
                  InputBoxWidget(
                    hintname: "Last Name",
                    hintStyle: landBodyText,
                    inputAction: TextInputAction.next,
                    inputType: TextInputType.text,
                    isHide: true),
                  signUpButtonWidget(
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