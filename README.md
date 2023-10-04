```text
 _________  _                     ______   __
|  _   _  |(_)                  .' ____ \ [  |
|_/ | | \_|__   _ .--.    _   __| (___ \_| | |--.   .--.   _ .--.
    | |   [  | [ `.-. |  [ \ [  ]_.____`.  | .-. |/ .'`\ \[ '/'`\ \
   _| |_   | |  | | | |   \ '/ /| \____) | | | | || \__. | | \__/ |
  |_____| [___][___||__][\_:  /  \______.'[___]|__]'.__.'  | ;.__/
                         \__.'                            [__|
```

## Description

TinyShop offre une API REST e-commerce simple permettant

* de consulter un panier en particulier :
`GET http://localhost:8294/carts/:cartId`
* d'ajouter un produit dans le panier :
`PUT http://localhost:8294/carts/:cartId/products/:productId`
* de récupérer le panier le plus cher :
`GET http://localhost:8294/carts/top`

## Exercice

Modifiez le code source de l'API à votre convenance, <b>répertoire `/src` uniquement</b>, afin qu'il soit conforme à vos standards de qualité.
Des tests ont été mis en place en fonction des attentes fonctionnelles de l'api. Le code des tests n'a pas besoin d'être modifié.

Pour lancer les tests, il est nécessaire d'avoir démarré l'API avec la commande `npm start`. Ensuite, il faudra lancer la commande `npm test` dans un autre terminal. En l'état actuel, ces tests ne passent pas. L'objectif va être de modifier le code source de l'API pour que les tests passent.

## Quelques explications techniques

__Pré-requis logiciel :__

Nodejs v18

__Initialisation des serveurs :__

Les deux commandes suivantes sont à exécuter au premier démarrage du service :

* `npm install` pour installer les dépendances Node
* `npm run reinit:mock` pour générer un jeu de données de test en local (le message "Init ok!" s'affiche si tout a fonctionné correctement)

Il n'est logiquement pas nécessaire de les relancer par la suite

__Lancement des serveurs :__

Le lancement des serveurs est un pré-requis pour l'execution des tests :

* un sur le port 8294 pour simuler l'API REST
* un sur le port 8293 pour simuler un appel à des API tierces

Depuis un terminal, la commande `npm start` permet de lancer les deux serveurs en parallèle sur ces ports. À chaque modification de code,
les serveurs redémarreront pour les appliquer directement

__Api externe :__

Le code des routes du type : <http://localhost:8293/>... n'ont pas vocation a etre modifiés. Ils ne servent qu'à exposer/manipuler des données.

Exemple :

    * renvoie l'ensemble des paniers techniques
    `GET http://localhost:8293/cart`

    * renvoie un panier technique
    `GET http://localhost:8293/cart/:cartId`

    * renvoi l'ensemble des produits
    `GET http://localhost:8293/products`

    * permet d'ajouter un produit dans un panier
    `PUT http://localhost:8293/cart/:cartId/products/:productId` 

    * permet de retirer le dernier produit ajouté au panier
    `DELETE http://localhost:8293/cart/:cartId/products/last` 

__Tester les routes :__

Pour tester les routes des deux services (autrement qu'avec `npm test`), une collection Postman est trouvable à la racine du projet. Elle montre la syntaxe de toutes les routes exposées.
