import 'package:flutter/material.dart';

class ShoppingListScreen extends StatefulWidget {
  const ShoppingListScreen({super.key});
  @override
  State<ShoppingListScreen> createState() => _ShoppingListScreenState();
}

class _ShoppingListScreenState extends State<ShoppingListScreen> {
  List<ShoppingSection> sections = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        backgroundColor: Colors.blueGrey[800],
        centerTitle: true,
        title: Text(
          'Grocery List',
          style: TextStyle(
            color: Colors.grey[300],
            fontSize: 30, // Adjust the font size as needed
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back), // Back arrow icon
          onPressed: () {
            // Add navigation or back button functionality here
            // For example, you can use Navigator to navigate back
          },
        ),
      ),
      body: ListView.builder(
        itemCount: sections.length,
        itemBuilder: (context, sectionIndex) {
          ShoppingSection section = sections[sectionIndex];
          return Card(
            margin: EdgeInsets.only(top: 16.0),
            color: Colors.blueGrey[800],
            child: Column(
              children: <Widget>[
                ListTile(
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit),
                        color: Colors.blueGrey[200],
                        onPressed: () {
                          TextEditingController sectionNameController =
                              TextEditingController();
                          sectionNameController.text = section.title;

                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                backgroundColor: Colors.blueGrey[600],
                                title: Text("Edit Section Name",
                                    style: TextStyle(
                                        color: Colors.grey[300], fontSize: 25)),
                                content: TextField(
                                  controller: sectionNameController,
                                  decoration: InputDecoration(
                                      labelText: "Section Name",
                                      labelStyle: TextStyle(
                                        color: Colors.grey[300],
                                        fontSize: 18,
                                      )),
                                ),
                                actions: [
                                  TextButton(
                                    onPressed: () {
                                      Navigator.pop(context);
                                    },
                                    child: Text("Cancel",
                                        style: TextStyle(
                                            color: Colors.grey[300],
                                            fontSize: 18)),
                                  ),
                                  TextButton(
                                    onPressed: () {
                                      String editedName =
                                          sectionNameController.text;
                                      setState(() {
                                        section.title = editedName;
                                      });
                                      Navigator.pop(context);
                                    },
                                    child: Text("Save",
                                        style: TextStyle(
                                            color: Colors.grey[300],
                                            fontSize: 18)),
                                  ),
                                ],
                              );
                            },
                          );
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete),
                        color: Colors.blueGrey[200],
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                backgroundColor: Colors.blueGrey[700],
                                title: Text("Delete Section",
                                    style: TextStyle(
                                        color: Colors.grey[300], fontSize: 25)),
                                content: Text(
                                    "Are you sure you want to delete this section?",
                                    style: TextStyle(
                                        color: Colors.grey[300], fontSize: 18)),
                                actions: [
                                  TextButton(
                                    onPressed: () {
                                      Navigator.pop(context);
                                    },
                                    child: Text("Cancel",
                                        style: TextStyle(
                                            color: Colors.grey[300],
                                            fontSize: 18)),
                                  ),
                                  TextButton(
                                    onPressed: () {
                                      setState(() {
                                        sections.removeAt(sectionIndex);
                                      });
                                      Navigator.pop(context);
                                    },
                                    child: Text("Delete",
                                        style: TextStyle(
                                            color: Colors.grey[300],
                                            fontSize: 18)),
                                  ),
                                ],
                              );
                            },
                          );
                        },
                      ),
                    ],
                  ),
                  title: Text(
                    section.title,
                    style: TextStyle(
                      color: Colors.blueGrey[
                          200], // Set the desired text color for the section name
                      fontSize: 24, // Adjust the font size as needed
                    ),
                  ),
                ),
                ListView.builder(
                  shrinkWrap: true,
                  itemCount: section.items.length,
                  itemBuilder: (context, itemIndex) {
                    bool isItemChecked =
                        section.itemsChecked[itemIndex] ?? false;
                    return ListTile(
                        leading: Checkbox(
                          value:
                              isItemChecked, // You can set the checkbox value here
                          onChanged: (bool? newValue) {
                            setState(() {
                              section.itemsChecked[itemIndex] = newValue;
                            });
                          },
                        ),
                        title: Row(
                          children: <Widget>[
                            Expanded(
                              child: Text(
                                "- ${section.items[itemIndex]}",
                                style: TextStyle(
                                  color: Colors.blueGrey[
                                      200], // Set the desired text color
                                  fontSize:
                                      20, // Adjust the font size as needed
                                ),
                              ),
                            ),
                          ],
                        ));
                  },
                ),
                if (section.items.length < 10)
                  ListTile(
                    title: TextField(
                      style: TextStyle(
                        color:
                            Colors.blueGrey[200], // Set the desired text color
                        fontSize: 15, // Adjust the font size as needed
                      ),
                      controller: TextEditingController(),
                      decoration: InputDecoration(
                        labelStyle: TextStyle(
                          color: Colors
                              .blueGrey[200], // Set the desired text color
                        ),
                        labelText: 'Add Item',
                      ),
                      onSubmitted: (text) {
                        setState(() {
                          section.items.add(text);
                        });
                      },
                    ),
                  ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blueGrey[800],
        onPressed: () {
          setState(() {
            sections.add(ShoppingSection(title: 'New Section', items: []));
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class ShoppingSection {
  String title;
  List<String> items;
  List<bool?> itemsChecked;

  ShoppingSection({required this.title, required this.items})
      : itemsChecked = List.filled(10, false);
}
