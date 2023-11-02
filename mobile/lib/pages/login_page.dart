import 'package:flutter/material.dart';
import 'package:mobile/palette.dart';
import 'package:mobile/widgets/background_widget.dart';
import 'package:mobile/widgets/inputbox_widget.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

// This uses the BackgroundImageWidget() from the widgets folder to set the
// background to the specified asset. Also the background Color of the child
// needs to be transparent so that the image can be seen.
class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        BackgroundImageWidget(
          image: const AssetImage('assets/landing.jpg'),
          child: Scaffold(
            backgroundColor: Colors.transparent,
            body: SafeArea(
              child: Column(
                children: [
                  Container(
                    height: 200,
                    child: const Center(
                      child: Text(
                        'My Culinary\n  Compass',
                        style: landHeading,
                      ),
                    ),
                  ),
                  const InputBoxWidget(
                      hintname: "Username",
                      hintStyle: landBodyText,
                      inputType: TextInputType.text,
                      inputAction: TextInputAction.next,
                      isHide: false),
                  const InputBoxWidget(
                    hintname: "Password",
                    hintStyle: landBodyText,
                    inputAction: TextInputAction.next,
                    inputType: TextInputType.text,
                    isHide: true,
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
