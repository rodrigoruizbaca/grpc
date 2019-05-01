rem grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./static_codegen/ --grpc_out=./static_codegen --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` notes.proto


protoc --plugin=protoc-gen-grpc=C:\Users\rodri\AppData\Roaming\npm\node_modules\grpc-tools\bin\grpc_node_plugin.exe --js_out=import_style=commonjs,binary:./static_codegen/ --grpc_out=./static_codegen notes.proto