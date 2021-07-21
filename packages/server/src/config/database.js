import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    console.log(`Database Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

export default connectDB;
