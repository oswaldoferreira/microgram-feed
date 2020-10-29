require('dotenv').config();

export const config = {
  'username': process.env.POSTGRES_USERNAME,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DB,
  'host': process.env.POSTGRES_HOST,
  'dialect': 'postgres',
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_BUCKET,
  'cors_origin': process.env.CORS_ORIGIN,
  'port': process.env.PORT,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
