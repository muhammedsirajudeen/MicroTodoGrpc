import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
const PROTO_PATH = path.resolve(__dirname, "../proto/todo.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition).example as any;
const client = new proto.Todo('localhost:50051', grpc.credentials.createInsecure());
export default client