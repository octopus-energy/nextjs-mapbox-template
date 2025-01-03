import { Style } from "mapbox-gl";
import { useEffect, useMemo, useState } from "react";

const getBasemapUrl = (mapboxId: string) =>
  `${process.env.NEXT_PUBLIC_BASE_STYLE_PATH}/${mapboxId}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

const DATA_LAYERS_AT_INDEX = 20;


export function useMapStyle(): {
  mapStyle?: Style;
  interactiveLayerIds: string[];
} {
  const [basemapStyle, setBasemapStyle] = useState<Style | undefined>(
    undefined
  );
  async function getBasemap() {
    const url = getBasemapUrl(process.env.NEXT_PUBLIC_BASE_STYLE_ID as string);
    const styleRaw = await fetch(url);
    const styleJson = await styleRaw.json();
    setBasemapStyle(styleJson);
  }
  useEffect(() => {
    getBasemap();
  }, []);

  const style: Style | undefined = useMemo(() => {
    if (!basemapStyle) return;


    const mapStyle: Style = {
      ...basemapStyle,
      sources: {
        ...basemapStyle.sources,
        // ...sources,
      },
      layers: [
        ...basemapStyle.layers.slice(0, DATA_LAYERS_AT_INDEX),
        // ...layers,
        ...basemapStyle.layers.slice(DATA_LAYERS_AT_INDEX),
      ],
    };

    return mapStyle;

  }, [basemapStyle]);


  return {
    mapStyle: style,
    interactiveLayerIds: [],
  };

}
