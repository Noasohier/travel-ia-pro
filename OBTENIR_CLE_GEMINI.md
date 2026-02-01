# 🔑 Comment obtenir votre clé API Google Gemini (GRATUITE)

## Pourquoi Gemini au lieu d'OpenRouter ?

- ✅ **Gratuit** avec des limites très généreuses (60 requêtes/minute)
- ✅ **Pas de rate limit** comme vous avez eu avec OpenRouter
- ✅ **Plus rapide** car accès direct sans intermédiaire
- ✅ **Meilleure qualité** avec Gemini 2.0 Flash

## 📝 Étapes pour obtenir votre clé API

### 1. Aller sur Google AI Studio
Ouvrez votre navigateur et allez sur : **https://aistudio.google.com/app/apikey**

### 2. Se connecter
- Connectez-vous avec votre compte Google
- Si vous n'en avez pas, créez-en un gratuitement

### 3. Créer une clé API
- Cliquez sur **"Create API Key"** ou **"Créer une clé API"**
- Sélectionnez un projet Google Cloud (ou créez-en un nouveau)
- La clé sera générée instantanément

### 4. Copier la clé
- Copiez la clé qui commence par `AIza...`
- ⚠️ **Important** : Gardez cette clé secrète !

### 5. Ajouter la clé dans votre projet

Ouvrez le fichier `.env` et remplacez `YOUR_GEMINI_API_KEY_HERE` par votre vraie clé :

```bash
VITE_GEMINI_API_KEY=AIzaSy...votre_clé_ici
```

### 6. Redémarrer le serveur

Dans votre terminal, arrêtez le serveur (Ctrl+C) puis relancez :

```bash
npm run dev
```

## ✅ C'est tout !

Votre application utilisera maintenant l'API Google Gemini directement, sans passer par OpenRouter.

## 🎯 Limites gratuites

- **60 requêtes par minute**
- **1500 requêtes par jour**
- **1 million de tokens par mois**

C'est largement suffisant pour votre usage personnel !

## ❓ En cas de problème

Si vous avez toujours des erreurs après avoir ajouté la clé :
1. Vérifiez que la clé commence bien par `AIza`
2. Vérifiez qu'il n'y a pas d'espaces avant ou après la clé
3. Redémarrez bien le serveur après modification du `.env`
