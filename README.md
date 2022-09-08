


## Projet Synthèse - [BitSafe Password Manager](https://bitsafevault.com/)
[Ceci](https://bitsafevault.com/)  est  une  application  web  qui    fait  de  la  gestion  de  mots  de  passe  pour un utilisateur.
## Description du projet
Cette application permet aux utilisateurs de sauvegarder leur information associée à un compte et de les recopier facilement. Autrement dit, de gérer leur mot de passe. On peut également générer des nouveaux mots de passe selon les paramètres de l'utilisateur.

## Technologie utilisé

 - Node.js : Gestion du Back-end
 - Express : Serveur web
 - EJS : Template engine
 - HTML CSS Javascript : Page web, style et script
 - MongoDB : Base de donnée
## Installation
Procédure complète d'installation.

**Utilisateur non technique :**
Pour avoir accès au projet et à toutes ses fonctionnaltés, aucune installation n'est requise.
Il faut tout simplement ce rendre sur [le site web](https://bitsafevault.com/) 
et de se crée un compte. Pour se créer un compte, il faut allez sur la page Register.
Entrez dans les champs vos informations : 
- Nom 
- Nom d'utillisateur
- Email
- Un mot de passe (Minimum 8 charatères contenant : 1 chiffre, 1 Minuscule, et 1 Majuscule)

Ensuite, les Utilisateurs serons capable de se connecter dans leur espace client 
et aurons accès à toutes les fonctions du site.


**Utilisateur Technique :**
Pour avoir ca propre version du site web sur son ordinateur et/ou sur sa machine virtuel,
il faut :

- Avoir une copie de mon Repos Git ( git clone )
- Ouvrir une Console de commande dans le Repos et installer toutes les dépendences Node 
avec la commande :

>  npm install

- Il faut avoir une bd Mongo avec Mongo Atlas
- Il faut ensuite créer un fichier nommé .env et l'insérer dans la racine du dossier Node.

Il contiendra toutes les informations sensible concernant l'application.
Dans notre cas :
- Nom de la BD mongo Atlas : bd_name = exemple_bd
- Utilisateur qui a acces à cette bd : bd = ExempleUser:motdepasse
Optionel :
Pour avoir être capable d'envoyer des emails avec se projet sur faut :
- Un compte Gmail contenant OAuth2 : EMAIL = emailExemple@gmail.com
- redirect url : redirect_url = https://developers.google.com/oauthplayground
- OAUthID : oauthId = votre id super long
- OAUthSecret : oauthSecret = votre secret
- OAUthRefreshToken : oauthRefreshToken = votre refresh token

Exemple de fichier .env :

    bd_name = exemple_bd
    bd = ExempleUser:motdepasse
    EMAIL = emailExemple@gmail.com
    redirect_url = https://developers.google.com/oauthplayground
    oauthId = votre id super long
    oauthSecret = votre secret
    oauthRefreshToken = votre refresh token


Pour démarrer le site web après toutes les prérequis 
Dans une console de commande, dans le dossier node du Repos: 
- on utilise la commande : node index.js
- Pour avoir accès au site dans un navigateur : http://localhost:4000/
