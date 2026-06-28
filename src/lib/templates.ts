export const getTemplate = (framework: string): any => {
  const fw = framework.toLowerCase();

  // Basic Python Boilerplate for AI/ML/Data Science
  const pythonTemplate = {
    'main.py': {
      file: { contents: '# Main Python Script\n\nprint("Hello World")\n' }
    },
    'requirements.txt': {
      file: { contents: '' }
    },
    'README.md': {
      file: { contents: `# ${framework} Project\n\nRun this project locally.` }
    }
  };

  switch (fw) {
    case 'react':
    case 'next.js':
    case 'astro':
    case 'svelte':
    case 'vue':
    case 'angular':
    case 'node.js':
    case 'express':
      return {
        'package.json': {
          file: {
            contents: JSON.stringify({
              name: "collab-code-project",
              type: "module",
              scripts: {
                dev: "vite",
                build: "vite build"
              },
              dependencies: {
                "react": "^18.2.0",
                "react-dom": "^18.2.0"
              },
              devDependencies: {
                "@vitejs/plugin-react": "^4.2.1",
                "vite": "^5.0.0"
              }
            }, null, 2)
          }
        },
        'index.html': {
          file: {
            contents: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Vite + React</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`
          }
        },
        'src': {
          directory: {
            'main.jsx': {
              file: {
                contents: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`
              }
            },
            'App.jsx': {
              file: {
                contents: `import React from 'react';\n\nfunction App() {\n  return (\n    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>\n      <h1>Hello from ${framework}!</h1>\n      <p>Edit src/App.jsx to see changes</p>\n    </div>\n  );\n}\n\nexport default App;\n`
              }
            },
            'index.css': {
              file: { contents: `body { margin: 0; background-color: #000; color: #fff; }` }
            }
          }
        }
      };

    case 'pytorch':
      return {
        'model.py': {
          file: {
            contents: `import torch\nimport torch.nn as nn\n\nclass SimpleNet(nn.Module):\n    def __init__(self):\n        super(SimpleNet, self).__init__()\n        self.fc = nn.Linear(10, 1)\n\n    def forward(self, x):\n        return self.fc(x)\n\nprint("PyTorch Model Initialized")\n`
          }
        },
        'train.py': {
          file: {
            contents: `import torch\nfrom model import SimpleNet\n\nmodel = SimpleNet()\nprint(model)\n`
          }
        },
        'requirements.txt': {
          file: { contents: `torch\ntorchvision\n` }
        },
        'README.md': {
          file: { contents: `# PyTorch Model\n\nExport this project to run PyTorch locally.` }
        }
      };

    case 'tensorflow':
      return {
        'model.py': {
          file: {
            contents: `import tensorflow as tf\n\nmodel = tf.keras.models.Sequential([\n  tf.keras.layers.Dense(10, activation='relu'),\n  tf.keras.layers.Dense(1)\n])\n\nprint("TensorFlow Model Initialized")\n`
          }
        },
        'requirements.txt': {
          file: { contents: `tensorflow\n` }
        }
      };

    case 'scikit-learn':
      return {
        'train.py': {
          file: {
            contents: `from sklearn.ensemble import RandomForestClassifier\n\nclf = RandomForestClassifier()\nprint("Classifier ready")\n`
          }
        },
        'requirements.txt': {
          file: { contents: `scikit-learn\nnumpy\npandas\n` }
        }
      };

    case 'python':
    case 'pandas':
      return {
        'analysis.py': {
          file: {
            contents: `import pandas as pd\n\ndf = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})\nprint(df.head())\n`
          }
        },
        'requirements.txt': {
          file: { contents: `pandas\nnumpy\n` }
        }
      };

    case 'jupyter':
      return {
        'notebook.ipynb': {
          file: {
            contents: `{\n "cells": [],\n "metadata": {},\n "nbformat": 4,\n "nbformat_minor": 5\n}`
          }
        },
        'requirements.txt': {
          file: { contents: `jupyter\nnotebook\n` }
        }
      };

    case 'django':
      return {
        'manage.py': {
          file: { contents: `#!/usr/bin/env python\n"""Django's command-line utility for administrative tasks."""\nimport os\nimport sys\n\ndef main():\n    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')\n    try:\n        from django.core.management import execute_from_command_line\n    except ImportError as exc:\n        raise ImportError(\n            "Couldn't import Django."\n        ) from exc\n    execute_from_command_line(sys.argv)\n\nif __name__ == '__main__':\n    main()\n` }
        },
        'requirements.txt': {
          file: { contents: `Django==5.0.0\n` }
        }
      };

    case 'flask':
      return {
        'app.py': {
          file: { contents: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello_world():\n    return 'Hello, Flask!'\n\nif __name__ == '__main__':\n    app.run(debug=True)\n` }
        },
        'requirements.txt': {
          file: { contents: `Flask==3.0.0\n` }
        }
      };

    case 'go':
      return {
        'main.go': {
          file: { contents: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Go!")\n}\n` }
        },
        'go.mod': {
          file: { contents: `module collab-code-project\n\ngo 1.21\n` }
        }
      };

    case 'react native':
      return {
        'App.js': {
          file: { contents: `import { Text, View } from 'react-native';\n\nexport default function App() {\n  return (\n    <View>\n      <Text>Open up App.js to start working on your app!</Text>\n    </View>\n  );\n}\n` }
        },
        'package.json': {
          file: { contents: JSON.stringify({ name: "rn-app", dependencies: { "react-native": "*" } }, null, 2) }
        }
      };

    case 'flutter':
      return {
        'lib': {
          directory: {
            'main.dart': {
              file: { contents: `import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(const MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        appBar: AppBar(title: const Text('Flutter App')),\n        body: const Center(child: Text('Hello World')),\n      ),\n    );\n  }\n}\n` }
            }
          }
        },
        'pubspec.yaml': {
          file: { contents: `name: flutter_app\ndescription: A new Flutter project.\n\nenvironment:\n  sdk: '>=3.0.0 <4.0.0'\n\ndependencies:\n  flutter:\n    sdk: flutter\n` }
        }
      };
      
    case 'swift':
      return {
        'ContentView.swift': {
          file: { contents: `import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        VStack {\n            Image(systemName: "globe")\n                .imageScale(.large)\n            Text("Hello, Swift!")\n        }\n        .padding()\n    }\n}\n` }
        },
        'App.swift': {
          file: { contents: `import SwiftUI\n\n@main\nstruct MyApp: App {\n    var body: some Scene {\n        WindowGroup {\n            ContentView()\n        }\n    }\n}\n` }
        }
      };
      
    case 'kotlin':
      return {
        'MainActivity.kt': {
          file: { contents: `package com.example.app\n\nimport android.os.Bundle\nimport androidx.activity.ComponentActivity\nimport androidx.activity.compose.setContent\nimport androidx.compose.material3.Text\n\nclass MainActivity : ComponentActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContent {\n            Text("Hello Kotlin!")\n        }\n    }\n}\n` }
        },
        'build.gradle.kts': {
          file: { contents: `plugins {\n    id("com.android.application")\n    id("org.jetbrains.kotlin.android")\n}\n` }
        }
      };

    case 'openai':
      return {
        'agent.py': {
          file: { contents: `import openai\nimport os\n\nopenai.api_key = os.getenv("OPENAI_API_KEY")\n\nresponse = openai.ChatCompletion.create(\n  model="gpt-4",\n  messages=[{"role": "user", "content": "Hello!"}]\n)\n\nprint(response)\n` }
        },
        'requirements.txt': {
          file: { contents: `openai\npython-dotenv\n` }
        },
        '.env.example': {
          file: { contents: `OPENAI_API_KEY=your_key_here\n` }
        }
      };

    case 'langchain':
      return {
        'main.py': {
          file: {
            contents: `"""LangChain Application"""
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# Create a prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI assistant. Respond concisely and accurately."),
    ("human", "{input}")
])

# Build the chain
chain = prompt | llm | StrOutputParser()

def main():
    print("\\n🦜 LangChain App Ready!\\n")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ("exit", "quit"):
            break
        response = chain.invoke({"input": user_input})
        print(f"AI: {response}\\n")

if __name__ == "__main__":
    main()
`
          }
        },
        'chains': {
          directory: {
            '__init__.py': {
              file: { contents: '' }
            },
            'retrieval.py': {
              file: {
                contents: `"""Retrieval-Augmented Generation (RAG) chain"""
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import FAISS

def build_rag_chain(documents: list[str]):
    """Build a simple RAG chain from a list of text documents."""
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(documents, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    prompt = ChatPromptTemplate.from_messages([
        ("system", "Answer based on the following context:\\n\\n{context}"),
        ("human", "{question}")
    ])

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | ChatOpenAI(model="gpt-4o-mini")
        | StrOutputParser()
    )
    return chain
`
              }
            }
          }
        },
        'requirements.txt': {
          file: {
            contents: `langchain>=0.3.0
langchain-openai>=0.2.0
langchain-community>=0.3.0
faiss-cpu>=1.8.0
python-dotenv>=1.0.0
`
          }
        },
        '.env.example': {
          file: { contents: `OPENAI_API_KEY=your_openai_api_key_here\n` }
        },
        'README.md': {
          file: {
            contents: `# 🦜 LangChain Project

## Setup
1. Copy \`.env.example\` to \`.env\` and add your OpenAI API key
2. Install dependencies: \`pip install -r requirements.txt\`
3. Run: \`python main.py\`

## Project Structure
- \`main.py\` — Interactive chat app using LangChain
- \`chains/retrieval.py\` — RAG (Retrieval-Augmented Generation) chain
- \`requirements.txt\` — Python dependencies
`
          }
        }
      };

    default:
      return pythonTemplate;
  }
};
