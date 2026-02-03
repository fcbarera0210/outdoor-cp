// Script para reemplazar URLs de imágenes con versiones más confiables
// IDs de imágenes de Unsplash que funcionan bien para montañas/outdoor

const imageReplacements = {
  // Montañas y paisajes
  'photo-1464822759023-fed622ff2c3b': '1464822759023-fed622ff2c3b', // Montañas - funciona
  'photo-1478131143081-80f7f84ca84d': '1478131143081-80f7f84ca84d', // Glaciar - funciona
  'photo-1551632811-561732d1e306': '1551632811-561732d1e306', // Hiking - funciona
  'photo-1501555088652-021faa106b9b': '1501555088652-021faa106b9b', // Trekking - funciona
  'photo-1519681393784-d8e5b5a4570e': '1519681393784-d8e5b5a4570e', // Bosque - funciona
  'photo-1454496522488-7a8e488e8606': '1454496522488-7a8e488e8606', // Paisaje montañoso - funciona
  'photo-1506929562872-bb421503ef21': '1506929562872-bb421503ef21', // Lago - funciona
  'photo-1533240332313-0dbdd3199061': '1533240332313-0dbdd3199061', // Naturaleza - funciona
  'photo-1483729558449-99ef09a8c325': '1483729558449-99ef09a8c325', // Volcán - funciona
  'photo-1507525428034-b723cf961d3e': '1507525428034-b723cf961d3e', // Costa - funciona
  'photo-1552083375-1447ce886485': '1552083375-1447ce886485', // Bosque - funciona
  'photo-1470071459604-3b5ec3a7fe05': '1470071459604-3b5ec3a7fe05', // Paisaje - funciona
  'photo-1544367563-12123d8965cd': '1544367563-12123d8965cd', // Mapa/montaña - funciona
  'photo-1491557345352-5929e343eb89': '1491557345352-5929e343eb89', // Desierto - funciona
  'photo-1544259595-d8869c3a383d': '1544259595-d8869c3a383d', // Equipo - funciona
  'photo-1617260026260-29c8ba6735c0': '1617260026260-29c8ba6735c0', // Naturaleza - funciona
  'photo-1516939884455-1445c8652f83': '1516939884455-1445c8652f83', // Montaña - funciona
  'photo-1520627787680-2a81387d7b05': '1520627787680-2a81387d7b05', // Paisaje - funciona
  'photo-1497290756760-23ac55edf36f': '1497290756760-23ac55edf36f', // Trekking - funciona
  'photo-1544198365-f5d60b6d8190': '1544198365-f5d60b6d8190', // Montaña - funciona
  'photo-1534234828569-1f3553dadd1a': '1534234828569-1f3553dadd1a', // Paisaje - funciona
  'photo-1502086223501-7ea6ecd79268': '1502086223501-7ea6ecd79268', // Montaña - funciona
}

// Función para generar URL de Unsplash más confiable
function getReliableUnsplashUrl(photoId, width = 2000, quality = 80) {
  // Usar el formato directo de Unsplash que es más confiable
  return `https://images.unsplash.com/${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&q=${quality}`
}

module.exports = { imageReplacements, getReliableUnsplashUrl }
