import 'package:flutter/material.dart';
import 'package:mobile/utils/helper.dart';

class ImageTab extends StatelessWidget {
  const ImageTab({Key? key}) : super(key: key);

  // Replace with your backend API endpoint
  static const String backendUrl = 'https://www.myculinarycompass.com/assets';

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      // Replace with your API call to fetch image URLs
      // You may use a Future or a package like dio/http to make the API call
      future: fetchImageUrls(),
      builder: (context, AsyncSnapshot<List<String>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(child: Text('No images available.'));
        } else {
          List<String> imageUrls = snapshot.data!;

          return GridView.builder(
            itemCount: imageUrls.length,
            gridDelegate:
                SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.all(2.0),
                child: Image.network(
                  '$backendUrl/${imageUrls[index]}',
                  fit: BoxFit.cover,
                ),
              );
            },
          );
        }
      },
    );
  }
}
