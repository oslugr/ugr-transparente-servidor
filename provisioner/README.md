ugr-transparente
============

Aplicación web para el portal de Transparencia de la Universidad de Granada.
Podemos encontrar los archivos necesarios para aprovisionar
una máquina mediante ansible.

## Uso

1.- Pondremos la dirección IP de la máquina en la que vamos a realizar dicha instalación en el fichero ansible_hosts.
```
[transparente-servidor]
192.168.33.33
```

2.- Realizaremos los cambios necesarios en el playbook de ansible transparente-servidor.yml relativos al usuario de la máquina en la que vamos a instalar la aplicación.
```
...
remote_user: {user}
...
```

3.- Asegurarnos que tenemos acceso por ssh a la máquina.

4.- Ejecutamos el programa de aprovisionamiento.
```
./instalar.sh
```

### URL

[transparente.ugr.es](transparente.ugr.es)
