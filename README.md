# NGOFinder - Find NGOs in and around you


## Execution
### Executng docker image
[Docker Link](https://hub.docker.com/repository/docker/nandysoham/ngofinder_backend/general)
```
docker pull nandysoham/ngofinder_backend:latest
docker run --name container_name --env-file ./backend.env --rm  -p 3000:3000  nandysoham/ngofinder_backend
```

File Structure of backend.env
```
PORT=
MONGOURI=
JWT_SECRET=
IPGEOAPI=
WEATHERAPI=
CLIENTID=
CLIENTSECRET=
REFRESHTOKEN=
EMAIL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_UPSTASH_URL=
```

#### Details of backend.env contents
| Key | Description | Reference |
|---|---|---|
| PORT | Port on which the application shall run  |  `PORT=2000` |
| MONGOURI | Connection string - fonnecting to Mongodb | Log in to Mongodb atlas, create a new database, get connection link. [Ref](https://www.mongodb.com/docs/manual/reference/connection-string/)
| JWT_SECRET | To sign JSON web tokens | Any combination of alphanumeric characters, eg: "AbCd1234" |
| IPGEOAPI | To get the current location of the client | [Ref](https://ipgeolocation.io/) |
| WEATHERAPI | to fetch the weather at the coordinates | [Ref](https://www.weatherapi.com/) |
| CLIENTID , CLIENTSECRET, REFRESHTOKEN | GCloud credentials for nodemailer | Follow this [blog](https://rupali.hashnode.dev/send-emails-in-nodejs-using-nodemailer-gmail-oauth2) for details | 
| EMAIL | Email in which you registered for GCloud credentials | eg: "nandysoham@gmail.com" |
| CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET | Cloudinary credentials for storing images | [Ref](https://cloudinary.com/documentation/node_integration#configuration) |
| REDIS_UPSTASH_UR | Upstash Url for Redis connection | [Ref](https://upstash.com/docs/redis/overall/getstarted) |

### Build from nodejs
```
git pull
cd path/to/directory
npm install
// create file .env in the folder NGOfinder_backend
npm start
```


