# Inital Server Setup

Buy a VPS, install Ubuntu 24.04. Setup to access via your private key. Everything is assuming the username of our user is `ubuntu`

```bash
# init
sudo apt update && sudo apt upgrade -y
sudo apt install wget curl python3-pip docker-compose -y

# pocketbase
mkdir -p ~/apps/pocketbase/pocketbasedev
cd ~/apps/pocketbase/pocketbasedev
wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_linux_amd64.zip
unzip ./pocketbase_0.23.4_linux_amd64.zip
rm CHANGELOG.md  LICENSE.md pocketbase_*.zip
cd ~/apps/pocketbase
cp pocketbasedev pocketbaseprod -r
cd ~/apps/pocketbase/pocketbasedev
./pocketbase superuser upsert hirushaadi@gmail.com AAw7Q1tDzm2uCuakPO6IyAsG
cd ~/apps/pocketbase/pocketbaseprod
./pocketbase superuser upsert hirushaadi@gmail.com AAw7Q1tDzm2uCuakPO6IyAsG
id -un && id -gn # get the user name & group name
sudo su # switch to root! enter your password
cd /etc/systemd/system/
nano pocketbasedev.service # paste the content from below
nano pocketbaseprod.service # paste the content from below
systemctl daemon-reload
nano ~/.basrch # (as root) add the stuff mentioned below
pben
pbstart

# docker and portainer
docker volume create portainer_data
docker run -d   -p 127.0.0.1:8000:8000   -p 127.0.0.1:9000:9000   --name portainer   --restart=always   -v /var/run/docker.sock:/var/run/docker.sock   -v portainer_data:/data   portainer/portainer-ce:latest # note that at port 9000 is the web ui

# caddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy

exit # back to user: `ubuntu`
cd ~
nano Caddyfile # paste the content from below
sudo caddy stop
sudo caddy start
```

pocketbasedev.service:

```ini
[Unit]
Description=Pocketbase Service
After=network.target

[Service]
ExecStart=/home/ubuntu/apps/pocketbasedev/pocketbase serve --http "127.0.0.1:3011"
WorkingDirectory=/home/ubuntu/apps/pocketbasedev
Restart=always
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
```

pocketbaseprod.service:

```ini
[Unit]
Description=Pocketbase Service
After=network.target

[Service]
ExecStart=/home/ubuntu/apps/pocketbaseprod/pocketbase serve --http "127.0.0.1:3010"
WorkingDirectory=/home/ubuntu/apps/pocketbaseprod
Restart=always
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
```

Add these to `~/.bashrc` (preferably of root, so, `/root/.bashrc`)

```bash
# Pocketbase
alias pbstart="systemctl start pocketbasedev.service && systemctl start pocketbaseprod.service && systemctl status pocketbaseprod pocketbasedev"
alias pbstop="systemctl stop pocketbasedev.service && systemctl stop pocketbaseprod.service && systemctl status pocketbaseprod pocketbasedev"
alias pben="systemctl enable --now pocketbasedev && systemctl enable --now pocketbaseprod && systemctl status pocketbaseprod pocketbasedev"
alias pbdis="systemctl disable pocketbasedev && systemctl disable pocketbaseprod && systemctl status pocketbaseprod pocketbasedev"
```

Caddyfile

```caddyfile
db.hirusha.xyz {
    handle_path /prod/* {
        reverse_proxy localhost:3010
    }

    handle_path /dev/* {
        reverse_proxy localhost:3011
    }
}

portainer.hirusha.xyz {
    reverse_proxy localhost:9000
}
```

# New config: Works!

```bash
# init
sudo apt update && sudo apt upgrade -y
sudo apt install wget curl python3-pip docker-compose -y

# docker and portainer
docker volume create portainer_data
docker run -d   -p 127.0.0.1:8000:8000   -p 127.0.0.1:9000:9000   --name portainer   --restart=always   -v /var/run/docker.sock:/var/run/docker.sock   -v portainer_data:/data   portainer/portainer-ce:latest # note that at port 9000 is the web ui

# caddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy

mkdir -p /home/ubuntu/apps/class-notes/pb # pb stuff inside here

```

- docker-compose.yml for pb

```yaml
version: "3.7"
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: pocketbase
    restart: unless-stopped
    ports:
      - "127.0.0.1:3010:8090"
    volumes:
      - /home/ubuntu/apps/class-notes/pb/pb_data:/pb_data
      - /home/ubuntu/apps/class-notes/pb/pb_public:/pb_public # optional
      - /home/ubuntu/apps/class-notes/pb/pb_hooks:/pb_hooks # optional
    healthcheck: # optional, recommended since v0.10.0
      test: wget --no-verbose --tries=1 --spider http://localhost:8090/api/health || exit 1
      interval: 5s
      timeout: 5s
      retries: 5
```

- Caddyfile

```
db.class.hirusha.xyz {
    reverse_proxy localhost:3010
}

portainer.hirusha.xyz {
    reverse_proxy localhost:9000
}
```
