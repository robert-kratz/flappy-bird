export interface GameAssets {
  characterSprite: {
    width: number;
    height: number;
    color: string;
    wingColor: string;
    render: (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, wingFrame: number) => void;
  };
  obstacle: {
    width: number;
    baseColor: string;
    edgeColor: string;
    render: (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      height: number,
      isTop: boolean
    ) => void;
  };
  background: {
    skyGradient: string[];
    groundColor: string;
    groundPatternColor: string;
    hillColors: {
      back: string;
      front: string;
    };
  };
  explosion?: {
    size: number;
    renderFrame1: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    renderFrame2: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
  };
}

const birdAssets: GameAssets = {
  characterSprite: {
    width: 30,
    height: 30,
    color: '#FFD700',
    wingColor: '#FFD700',
    render: (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, wingFrame: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Bird body
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(1, '#FFA500');

      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Wing
      ctx.fillStyle = '#FFD700';
      const wingHeight = wingFrame === 1 ? 8 : 12;
      ctx.fillRect(-5, -wingHeight/2, 10, wingHeight);

      // Eye
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(8, -5, 3, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(20, -3);
      ctx.lineTo(20, 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  },
  obstacle: {
    width: 52,
    baseColor: '#2ECC71',
    edgeColor: '#27AE60',
    render: (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, isTop: boolean) => {
      const gradient = ctx.createLinearGradient(x, 0, x + 52, 0);
      gradient.addColorStop(0, '#2ECC71');
      gradient.addColorStop(0.5, '#27AE60');
      gradient.addColorStop(1, '#2ECC71');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, 52, height);

      // Edge
      ctx.fillStyle = '#27AE60';
      if (isTop) {
        ctx.fillRect(x - 5, y + height - 5, 62, 5);
      } else {
        ctx.fillRect(x - 5, y, 62, 5);
      }
    }
  },
  background: {
    skyGradient: ['#4EC0CA', '#73D5F0'],
    groundColor: '#2ECC71',
    groundPatternColor: '#27AE60',
    hillColors: {
      back: '#1A8C4A',
      front: '#19b35a'
    }
  }
};

const planeAssets: GameAssets = {
  characterSprite: {
    width: 40,
    height: 20,
    color: '#FFFFFF',
    wingColor: '#DDDDDD',
    render: (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Airplane body
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wings
      ctx.fillStyle = '#DDDDDD';
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(0, -15);
      ctx.lineTo(10, 0);
      ctx.closePath();
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(20, -8);
      ctx.lineTo(20, 0);
      ctx.closePath();
      ctx.fill();

      // Windows
      ctx.fillStyle = '#87CEEB';
      for (let i = -12; i <= 8; i += 5) {
        ctx.beginPath();
        ctx.arc(i, -3, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  },
  obstacle: {
    width: 70,
    baseColor: '#808080',
    edgeColor: '#606060',
    render: (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, isTop: boolean) => {
      // Building base
      const gradient = ctx.createLinearGradient(x, 0, x + 70, 0);
      gradient.addColorStop(0, '#808080');
      gradient.addColorStop(0.5, '#606060');
      gradient.addColorStop(1, '#808080');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, 70, height);

      // Windows
      const windowSize = 6;
      const windowSpacing = 9;
      const windowMargin = 5;
      const windowsAcross = 7;
      
      // Calculate total width of windows and spacing
      const totalWindowWidth = (windowsAcross * windowSize) + ((windowsAcross - 1) * (windowSpacing - windowSize));
      const startX = x + (70 - totalWindowWidth) / 2;

      // Window properties
      ctx.fillStyle = '#87CEEB';
      const startY = isTop ? y + height - windowMargin - windowSize : y + windowMargin;
      const yDirection = isTop ? -1 : 1;
      const rowSpacing = windowSpacing + 2;

      // Draw windows
      for (let row = 0; row < Math.floor((height - (windowMargin * 2)) / rowSpacing); row++) {
        const windowY = startY + (row * rowSpacing * yDirection);
        
        // Only draw windows if they're within the building bounds
        if (windowY > y + windowMargin && windowY < y + height - windowMargin - windowSize) {
          for (let col = 0; col < windowsAcross; col++) {
            const windowX = startX + (col * windowSpacing);
            ctx.fillRect(windowX, windowY, windowSize, windowSize);
          }
        }
      }

      // Building edge
      ctx.fillStyle = '#606060';
      if (isTop) {
        ctx.fillRect(x - 5, y + height - 5, 80, 5);
      } else {
        ctx.fillRect(x - 5, y, 80, 5);
      }
    }
  },
  background: {
    skyGradient: ['#1a1a2e', '#16213e'],
    groundColor: '#1f1f1f',
    groundPatternColor: '#2d2d2d',
    hillColors: {
      back: '#2d2d2d',
      front: '#3d3d3d'
    }
  },
  explosion: {
    size: 60,
    renderFrame1: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);

      // Inner explosion
      const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      innerGradient.addColorStop(0, '#FFF');
      innerGradient.addColorStop(0.4, '#FFD700');
      innerGradient.addColorStop(1, '#FF4500');

      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();

      // Outer flames
      ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const length = 20 + Math.random() * 10;
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(angle) * length,
          Math.sin(angle) * length
        );
      }
      ctx.strokeStyle = '#FF4500';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.restore();
    },
    renderFrame2: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);

      // Inner explosion
      const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 25);
      innerGradient.addColorStop(0, '#FFD700');
      innerGradient.addColorStop(0.6, '#FF4500');
      innerGradient.addColorStop(1, '#8B0000');

      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();

      // Outer flames
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const length = 25 + Math.random() * 15;
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(angle) * length,
          Math.sin(angle) * length
        );
      }
      ctx.strokeStyle = '#FF8C00';
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.restore();
    }
  }
};

export const getAssets = (route: string): GameAssets => {
  return route === '/911' ? planeAssets : birdAssets;
};