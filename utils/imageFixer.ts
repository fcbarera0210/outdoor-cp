/**
 * Utilidad para corregir URLs de imágenes rotas y proporcionar fallbacks
 */

// URLs alternativas de Unsplash para diferentes categorías
const UNSPLASH_IMAGES = {
  mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  hiking: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  nature: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  forest: 'https://images.unsplash.com/photo-1519681393784-d8e5b5a4570e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  glacier: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  landscape: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  lake: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  coast: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  adventure: 'https://images.unsplash.com/photo-1533240332313-0dbdd3199061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  sunset: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  volcano: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  map: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  beach: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
};

// Servicio alternativo para avatares
const AVATAR_SERVICE = 'https://ui-avatars.com/api/';

/**
 * Obtiene una URL de avatar alternativa
 */
export function getAvatarUrl(name: string, size: number = 80): string {
  return `${AVATAR_SERVICE}?name=${encodeURIComponent(name)}&size=${size}&background=random`;
}

/**
 * Corrige URLs de imágenes rotas basándose en el contexto
 */
export function fixImageUrl(originalUrl: string, context?: string): string {
  // Si la URL es de randomuser.me, usar servicio alternativo
  if (originalUrl.includes('randomuser.me')) {
    const match = originalUrl.match(/portraits\/(men|women)\/(\d+)/);
    if (match) {
      const gender = match[1] === 'men' ? 'male' : 'female';
      const id = match[2];
      return getAvatarUrl(`${gender}-${id}`);
    }
    return getAvatarUrl('user');
  }

  // Si es una URL de Unsplash, verificar si necesita corrección
  if (originalUrl.includes('unsplash.com')) {
    // Si la URL parece válida, mantenerla
    if (originalUrl.includes('photo-') && originalUrl.includes('ixlib=')) {
      return originalUrl;
    }
  }

  // Determinar tipo de imagen basado en contexto o URL
  let imageType: keyof typeof UNSPLASH_IMAGES = 'mountain';
  
  if (context) {
    const lowerContext = context.toLowerCase();
    if (lowerContext.includes('glacier') || lowerContext.includes('hielo')) imageType = 'glacier';
    else if (lowerContext.includes('forest') || lowerContext.includes('bosque')) imageType = 'forest';
    else if (lowerContext.includes('lake') || lowerContext.includes('lago')) imageType = 'lake';
    else if (lowerContext.includes('coast') || lowerContext.includes('costa')) imageType = 'coast';
    else if (lowerContext.includes('hiking') || lowerContext.includes('trekking')) imageType = 'hiking';
    else if (lowerContext.includes('nature') || lowerContext.includes('naturaleza')) imageType = 'nature';
    else if (lowerContext.includes('adventure') || lowerContext.includes('aventura')) imageType = 'adventure';
    else if (lowerContext.includes('sunset') || lowerContext.includes('atardecer')) imageType = 'sunset';
    else if (lowerContext.includes('volcano') || lowerContext.includes('volcan')) imageType = 'volcano';
    else if (lowerContext.includes('map') || lowerContext.includes('mapa')) imageType = 'map';
    else if (lowerContext.includes('beach') || lowerContext.includes('playa')) imageType = 'beach';
  }

  return UNSPLASH_IMAGES[imageType];
}

/**
 * Procesa un HTML y corrige todas las URLs de imágenes
 */
export function fixImageUrlsInHtml(html: string): string {
  // Reemplazar URLs de randomuser.me
  html = html.replace(
    /https:\/\/randomuser\.me\/api\/portraits\/(men|women)\/(\d+)\.jpg/g,
    (match, gender, id) => {
      const name = gender === 'men' ? `male-${id}` : `female-${id}`;
      return getAvatarUrl(name, 80);
    }
  );

  // Verificar y corregir URLs de Unsplash problemáticas
  // Mantener las URLs válidas de Unsplash
  html = html.replace(
    /src="(https:\/\/images\.unsplash\.com\/[^"]+)"/g,
    (match, url) => {
      // Si la URL no tiene parámetros válidos, corregirla
      if (!url.includes('ixlib=') || !url.includes('photo-')) {
        return `src="${UNSPLASH_IMAGES.mountain}"`;
      }
      return match;
    }
  );

  return html;
}
