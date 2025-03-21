import React, { useEffect, useRef } from "react";
import "./Roller.css";

const Roller = () => {
  const canvasRef = useRef(null);
  const size = 150;
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  let angleX = 180, // Adjusted to place the two sharp edges straight
    angleY = 180; // Adjusted to place the two sharp edges straight
  let lastMouseX = 0,
    lastMouseY = 0;
  let isMouseMoving = false;

  const vertices = [
    [0, 1, phi],
    [0, -1, phi],
    [0, 1, -phi],
    [0, -1, -phi],
    [1, phi, 0],
    [-1, phi, 0],
    [1, -phi, 0],
    [-1, -phi, 0],
    [phi, 0, 1],
    [phi, 0, -1],
    [-phi, 0, 1],
    [-phi, 0, -1],
  ].map((v) => v.map((c) => (c * size) / Math.sqrt(1 + phi ** 2)));

  const faces = [
    [0, 1, 8],
    [0, 8, 4],
    [0, 4, 5],
    [0, 5, 10],
    [0, 10, 1],
    [1, 10, 7],
    [1, 7, 6],
    [1, 6, 8],
    [2, 3, 11],
    [2, 11, 5],
    [2, 5, 4],
    [2, 4, 9],
    [2, 9, 3],
    [3, 9, 6],
    [3, 6, 7],
    [3, 7, 11],
    [4, 8, 9],
    [5, 11, 10],
    [6, 9, 8],
    [7, 10, 11],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 400;

    const project3D = (x, y, z) => {
      const scale = 300 / (z + 400);
      return [x * scale, y * scale];
    };

    const normalize = (v) => {
      const length = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
      return v.map((c) => c / length);
    };

    const drawIcosahedron = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      const rotatedVertices = vertices.map(([x, y, z]) => {
        let tempY = y * Math.cos(angleX) - z * Math.sin(angleX);
        let tempZ = y * Math.sin(angleX) + z * Math.cos(angleX);
        let tempX = x * Math.cos(angleY) - tempZ * Math.sin(angleY);
        tempZ = x * Math.sin(angleY) + tempZ * Math.cos(angleY);
        return [tempX, tempY, tempZ];
      });

      const sortedFaces = faces
        .map((face) => {
          const avgZ = face.reduce(
            (sum, i) => sum + rotatedVertices[i][2],
            0
          ) / 3;
          return { face, avgZ };
        })
        .sort((a, b) => b.avgZ - a.avgZ);

      sortedFaces.forEach(({ face }) => {
        const projectedFace = face.map((i) => project3D(...rotatedVertices[i]));

        const [p1, p2, p3] = face.map((i) => rotatedVertices[i]);
        const normal = normalize([
          (p2[1] - p1[1]) * (p3[2] - p1[2]) -
            (p2[2] - p1[2]) * (p3[1] - p1[1]),
          (p2[2] - p1[2]) * (p3[0] - p1[0]) -
            (p2[0] - p1[0]) * (p3[2] - p1[2]),
          (p2[0] - p1[0]) * (p3[1] - p1[1]) -
            (p2[1] - p1[1]) * (p3[0] - p1[0]),
        ]);

        const light = normalize([0, 0, 1]);
        let brightness = Math.max(
          0.2,
          normal[0] * light[0] + normal[1] * light[1] + normal[2] * light[2]
        );

        ctx.beginPath();
        ctx.moveTo(...projectedFace[0]);
        ctx.lineTo(...projectedFace[1]);
        ctx.lineTo(...projectedFace[2]);
        ctx.closePath();
        ctx.fillStyle = `rgb(${brightness * 255}, ${brightness * 255}, ${
          brightness * 255
        })`;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
      });

      ctx.restore();
    };

    const update = () => {
      if (!isMouseMoving) {
        angleY += 0.01;
      }
      drawIcosahedron();
      requestAnimationFrame(update);
    };

    const handleMouseMove = (event) => {
      isMouseMoving = true;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left - canvas.width / 2;
      const mouseY = event.clientY - rect.top - canvas.height / 2;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;

      angleY += dx * 0.009;
      angleX += dy * 0.009;

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      setTimeout(() => {
        isMouseMoving = false;
      }, 10);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    update();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="roller-container">
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default Roller;