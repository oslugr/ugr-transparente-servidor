#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
reload(sys)
sys.setdefaultencoding("utf-8")

import json
from pprint import pprint

import pickle
import codecs

json_data=open("claustro.json")
data = json.load(json_data)
json_data.close()

archivos = ["claustro.json","estudiantes.json", "gobierno.json", "infoEconomica.json", "normativaLegal.json", "ofertaDemanda.json", "personal.json", "rendimiento.json"]

list = []

for archivo in archivos:
	json_data=open(archivo)
	data = json.load(json_data)
	json_data.close()
	for contenido in data["contenido"]:
		texto = str(contenido["encabezado"]) + " " + str(contenido["texto"])
		entrada = {"nombre": str(contenido["encabezado"]), "texto": texto, "url": "http://transparente.ugr.es/claustro.html#" + str(contenido["link"])}
		list.append(entrada)
		for dato in contenido["datos"]:
			entrada = {"nombre": (dato["nombre"]), "texto": (dato["nombre"]), "url": "http://transparente.ugr.es/claustro.html#" + str(contenido["link"])}
			list.append(entrada)


with codecs.open("indice.json", "w", "utf-8-sig") as temp:
	temp.write(json.dumps(list, ensure_ascii=False))
