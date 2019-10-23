import '../vendor/GLTFLoader.js';
import '../vendor/OBJLoader.js';

const BASIS_LIB_PATH = '../src/vendor/';

function allAssetsLoaded(assets) {
  for (var i in assets) {
    if (typeof assets[i] === 'string') { return false; }
  }
  return true;
}

export function loadAssets(renderer, basePath, assets, onComplete) {
  if (basePath && basePath[basePath.length - 1] != '/') {
    basePath += '/';
  }

  var basisLoader = new THREE.BasisTextureLoader();
  basisLoader.setTranscoderPath(BASIS_LIB_PATH);
  basisLoader.detectSupport(renderer);
  var texLoader = new THREE.TextureLoader();
  var gltfLoader = new THREE.GLTFLoader();
  var objLoader = new THREE.OBJLoader();
  var fontLoader = new THREE.FontLoader();

  var loaders = {
    'gltf': gltfLoader,
    'glb': gltfLoader,
    'obj': objLoader,
    'gif': texLoader,
    'png': texLoader,
    'jpg': texLoader,
    'basis': basisLoader,
    'font': fontLoader
  };

  for (var i in assets) {
    let assetId = i;
    let assetPath = assets[i];
    let ext = assetPath.substr(assetPath.lastIndexOf('.') + 1).toLowerCase();
    loaders[ext].load(basePath + assetPath, asset => {
      console.info(`%c ${assetPath} loaded`, 'color:green');
      assets[assetId] = ext == 'font'? asset.data : asset;
      if (onComplete && allAssetsLoaded(assets)) { onComplete(); }
    });
  }
}