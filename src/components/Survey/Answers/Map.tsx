'use client';

import React, {useEffect} from 'react'
import 'ol/ol.css'
import {Feature, Map, View} from 'ol'
import { defaults as defaultControls, FullScreen } from 'ol/control'
import {fromLonLat, transform} from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import { XYZ } from 'ol/source'
import proj4 from 'proj4';

import {
    DragRotateAndZoom,
    defaults as defaultInteractions,
} from 'ol/interaction'
import {register} from "ol/proj/proj4";
import VectorLayer from "ol/layer/Vector";
import {Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from "ol/style";

proj4.defs('EPSG:5174', '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43');
register(proj4);

type MapComponentProps = {
    questionId: string;
    center: [number, number] | undefined;
    onAnswerChange?: (value: string) => void;
}

const MapComponent = ({ questionId, center, onAnswerChange }: MapComponentProps ) => {

    useEffect(() => {
        const vworldKey = 'F79DF30C-7109-30C4-8E1F-1539EF5FC93D';

        const poiSource = new VectorSource();
        const poiLayer = new VectorLayer({
            source: poiSource,
        });

        const map = new Map({
            controls: defaultControls({zoom: false, rotate: false}).extend([
                new FullScreen(),
            ]),
            interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: `https://api.vworld.kr/req/wmts/1.0.0/${vworldKey}/Base/{z}/{y}/{x}.png`,
                    }),
                }),
                poiLayer,
            ],
            target: `map_${questionId}`,
            view: new View({
                center: fromLonLat(
                    center ? center : [126.784587, 37.645143],
                ),
                zoom: 15,
            }),
        });

        map.on('click', (event) => {

            const clickedCoord = event.coordinate;
            const transformedCoord =  transform(clickedCoord, 'EPSG:3857', 'EPSG:5174');

            if (onAnswerChange) {

                const param = {
                    x: transformedCoord[0],
                    y: transformedCoord[1]
                }

                onAnswerChange(JSON.stringify(param));
            }

            const poiFeature = poiSource.getFeatures()[0];
            if(poiFeature) {
                poiFeature.setGeometry(new Point(clickedCoord));
                return;
            }

            const newFeature = new Feature({
                geometry: new Point(clickedCoord),
            });

            const iconStyle = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.1,
                    src: "/poi.png"
                }),
            });

            newFeature.setStyle(iconStyle);

            poiSource.addFeature(newFeature);
        });

        return () => {
            map.setTarget(undefined);
            map.dispose();
        }
    }, []);


    return (
        <>
            <div id={`map_${questionId}`} className={"w-full h-96"}/>
        </>
    )


}

export default MapComponent;