# 350-front-end

**FRONT END SET UP**

First since the server is using ubuntu we will need to install npm and nodejs to make sure we can build our Vue page. 
The server will be using **nginx**

## Prepare Nginx

...bash
npm install nginx
...

After installing nginx if you go to the servr address 192.168.50.64 you will see the nginx welcome page.
This means the server is listening to port 80

Now it is time to set the configuration so nginx can find our index.html file

...
sudo nano /etc/nginx/sites-available/default
...

Replace the following code in the line that says **root /var/www/html**

...
root /var/www/html/350-front-end/frontend/dist
...

Now everything is good with nginx. It is time to set the front end. Run the following commands

...
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

nvm --version (it should return version number)

nvm install --lts

npm install -g npm@latest
...

Now that everything is set lets run the following steps to build the index.html for production

...
cd /var/www/html

git clone (repository)

cd /var/www/html/350-front-end/frontend/

npm run build

sudo service nginx reload
...

The command **npm run build** builds a destination folder that it will have an index.html file that we will render using nginx

If you to go **http://server_address** you should have the front end page.

