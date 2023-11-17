import os
import re

def parse_input(input_text):
    """
    Parses the input text to extract file paths and code.
    The input text is expected to have a specific format with file names and code blocks.
    """
    # Split the input text by lines
    lines = input_text.split('\n')

    # Pattern to identify the start of a new file block
    file_pattern = re.compile(r'^\s*-\s*(.*\.js|.*\.css)\s*$')

    # Initialize variables
    files = []
    current_file = None
    current_code = []

    # Process each line
    for line in lines:
        # Check if the line is a file name
        file_match = file_pattern.match(line)
        if file_match:
            # Save the current file and code block if any
            if current_file:
                files.append((current_file, '\n'.join(current_code)))
            # Reset for the new file
            current_file = file_match.group(1)
            current_code = []
        else:
            # Add the line to the current code block
            current_code.append(line)

    # Add the last file and code block
    if current_file:
        files.append((current_file, '\n'.join(current_code)))

    return files

def create_file(file_path, code, base_path='src/'):
    """
    Creates a file at the given path and writes the code into it.
    """
    # Construct the full path
    full_path = os.path.join(base_path, file_path)

    # Create the directory if it doesn't exist
    directory = os.path.dirname(full_path)
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Write the code to the file
    with open(full_path, 'w') as file:
        file.write(code)

def main(input_text):
    """
    Main function to parse the input text and create files.
    """
    file_data = parse_input(input_text)
    for file_path, code in file_data:
        create_file(file_path, code)

# The actual full input text
input_text = """
- App.js
import React from 'react';
import Header from './Header';
import DocumentList from './DocumentList';
import Tabs from './Tabs';
import Result from './Result';
import './styles.css';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <DocumentList />
        <Tabs />
        <Result />
      </div>
    </div>
  );
}

export default App;

- Header.js
import React from 'react';
import './styles.css';

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo">Verif Clone</div>
        <button className="login-button">Login</button>
      </div>
    </header>
  );
}

- DocumentList.js
import React from 'react';
import './styles.css';

export default function DocumentList() {
  return (
    <div className="column" id="document-list">
      <h2>List of documents</h2>
      <p>Here will document categories and all documents be displayed via API</p>
    </div>
  );
}

- Tabs.js
import React from 'react';
import './styles.css';

export default function Tabs() {
  return (
    <div className="column" id="tabs">
      <div className="tabs">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
        <button>Tab 4</button>
      </div>
      <div className="tab-content">
        <p>Automatically should load forms that necessary for chosen document. This should automatically load via API</p>
      </div>
    </div>
  );
}

- Result.js
import React from 'react';
import './styles.css';

export default function Result() {
  return (
    <div className="column" id="result">
      <h2>Result</h2>
      <p>Here will the image result be displayed</p>
    </div>
  );
}

- styles.css
body, h2, p {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f2f2f2;
}

.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.login-button {
  padding: 5px 20px;
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.column {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 0 10px;
}

#document-list {
  /* Adjust width as necessary */
  flex-basis: 20%;
}

#tabs {
  /* Adjust width as necessary */
  flex-basis: 50%;
}

#result {
  /* Adjust width as necessary */
  flex-basis: 30%;
}

.tabs button {
  display: inline-block;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #e0e0e0;
  border: none;
}

.tab-content {
  margin-top: 20px;
}

/* Add responsive behavior if necessary */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .column {
    margin: 10px 0;
  }
}


/* Add more styles as needed */
"""  # Ensure this line is exactly like this with no extra characters or spaces

# Execute the main function
main(input_text)