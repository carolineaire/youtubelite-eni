import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // URLs publiques qui ne doivent jamais recevoir le JWT
  const publicUrls = [
    'youtube.googleapis.com',
    'googleapis.com/youtube'
  ];

  // Vérifie si la requête cible une URL publique
  const isPublicRequest = publicUrls.some(url =>
    req.url.includes(url)
  );

  // Ne rien ajouter pour ces APIs publiques
  if (isPublicRequest) {
    return next(req);
  }

  // Récupération du token utilisateur
  const token = localStorage.getItem('token');

  // Si pas de token → requête normale
  if (!token) {
    return next(req);
  }

  // Ajout sécurisé du Bearer token
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};