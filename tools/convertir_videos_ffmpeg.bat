@echo off
mkdir assets\videos

ffmpeg -i "01_Pasillo y Lab.MP4" -vf "scale=1280:-2,fps=24" -c:v libx264 -preset veryfast -crf 32 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart "assets\videos\01_pasillo_principal_web.mp4"
ffmpeg -i "02_Espacio_1_salon1.MP4" -vf "scale=1280:-2,fps=24" -c:v libx264 -preset veryfast -crf 32 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart "assets\videos\02_espacio_1_salon1_web.mp4"
ffmpeg -i "03_Espacio_salón 2.MP4" -vf "scale=1280:-2,fps=24" -c:v libx264 -preset veryfast -crf 32 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart "assets\videos\03_espacio_2_salon_web.mp4"
ffmpeg -i "04_Espacio_2_podcast.MP4" -vf "scale=1280:-2,fps=24" -c:v libx264 -preset veryfast -crf 32 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart "assets\videos\04_podcast_sonido_web.mp4"

pause
