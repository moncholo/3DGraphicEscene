function CentroBaseEspacialInterno () {

	this.puntosBezierInternos = 50;
	this.cantidadBeziers =4;
	
	//El numero de columnas es el numero de puntos que tenga el perfil
	this.grilla = new VertexGrid(20,this.puntosBezierInternos*this.cantidadBeziers);
	this.grilla.initTexture("Resources/techo.jpg");
	this.grilla.initNormalTexture("Resources/piso.jpg");
	this.grilla.initSecondTexture("Resources/paredInterna1.jpg");
	this.grilla.initThirdTexture("Resources/techo-ilumMap.jpg");
	
	this.grilla.multipleImages = true;
	
	this.puntosPolinomio = [];
	
	this.curvas = new CurvasInternasCentroEstacionEspacial(this.puntosBezierInternos);
	
	this.puntosTapas = [];
	this.puntosTapas2 = [];
	
	this.puntosLuces = [];

	this.crearEstacionEspacial = function(){
		
		this.grilla.position_buffer = [];
		this.grilla.color_buffer = [];
		this.grilla.normal_buffer = [];
		this.grilla.texture_coord_buffer = [];
		this.grilla.biNormal_buffer = [];
        this.grilla.tangent_buffer = [];

		var x=0.0;
		var y=0.0;
		var z=0.0;
		
		var u=0;
		var base= mat4.create();
		var posNew = [];
		var angle = 0.0;
		
		for (var j=0;j<this.grilla.rows;j++){
			
			v = [1.5*Math.cos(angle), 1.5*Math.sin(angle), 0];
			
			angle+= (Math.PI*1.5)/this.grilla.rows;
			u=0.0;
			//angle=0.0;
			
			for (var h =0;h<this.cantidadBeziers;h++){
				for (var i=0;i<this.puntosBezierInternos;i++){
					
					var beizerActual = this.puntosPolinomio[h];
					
					x = beizerActual[i].getX();
					y = beizerActual[i].getY();
			
					mat4.identity(base);
					mat4.translate(base,base,v);
					
					mat4.rotate(base, base, Math.PI/2, [1.0, 0.0, 0.0]);
					mat4.rotate(base, base, angle, [0.0, 1.0, 0.0]);
					
					mat4.scale(base,base,[0.8,0.8,0.8]);
					mat4.translate(base,base,[0.4,-1.0,0.0]);
					
					vec3.transformMat4(posNew,[x,y,0.0],base);
					
					if (j==0){
						this.puntosTapas.push([posNew[0],posNew[1],posNew[2]]);
					}
					else if (j==this.grilla.rows-1){
						this.puntosTapas2.push([posNew[0],posNew[1],posNew[2]]);
					}
					
					imgU = j / this.puntosBezierInternos *15.0;
					imgV = i /this.grilla.rows / 2.2;
					
					this.grilla.texture_coord_buffer.push(imgU);
					this.grilla.texture_coord_buffer.push(imgV);
					this.grilla.texture_coord_buffer.push(h);
					
					this.grilla.normal_buffer.push(posNew[0]);
					this.grilla.normal_buffer.push(posNew[1]);
					this.grilla.normal_buffer.push(posNew[2]);

					this.grilla.biNormal_buffer.push(1.0);
					this.grilla.biNormal_buffer.push(0.0);
					this.grilla.biNormal_buffer.push(0.0);
					
					this.grilla.tangent_buffer.push(0.0);
					this.grilla.tangent_buffer.push(1.0);
					this.grilla.tangent_buffer.push(0.0);


					this.grilla.color_buffer.push(92/255);
					this.grilla.color_buffer.push(46/255);
					this.grilla.color_buffer.push(109/255);						
					
					this.grilla.position_buffer.push(posNew[0]);								
					this.grilla.position_buffer.push(posNew[1]);
					this.grilla.position_buffer.push(posNew[2]);
					
					if (j==2 && h==0 && i==0)
						this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
					else if (j==5 && h==0 && i==0)
						this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
					else if (j==8 && h==0 && i==0)
						this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
					else if (j==11 && h==0 && i==0)
						this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
					else if (j==14 && h==0 && i==0)
						this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);
					else if (j==this.grilla.rows-1 && h==0 && i==0)
						this.puntosLuces.push([posNew[0],posNew[1],posNew[2]]);	

				}
			}
			
			
				
			
		}
	}


	this.draw = function(modelMatrix){
		
		var luz = [this.puntosLuces[0][0],this.puntosLuces[0][1],this.puntosLuces[0][2]];
		var luz2 = [this.puntosLuces[1][0],this.puntosLuces[1][1],this.puntosLuces[1][2]];
		var luz3 = [this.puntosLuces[2][0],this.puntosLuces[2][1],this.puntosLuces[2][2]];
		var luz4 = [this.puntosLuces[3][0],this.puntosLuces[3][1],this.puntosLuces[3][2]];
		var luz5 = [this.puntosLuces[4][0],this.puntosLuces[4][1],this.puntosLuces[4][2]];
		var luz6 = [this.puntosLuces[5][0],this.puntosLuces[5][1],this.puntosLuces[5][2]];
		
		vec3.transformMat4(luz,luz,modelMatrix);
		vec3.transformMat4(luz2,luz2,modelMatrix);
		vec3.transformMat4(luz3,luz3,modelMatrix);
		vec3.transformMat4(luz4,luz4,modelMatrix);
		vec3.transformMat4(luz5,luz5,modelMatrix);
		vec3.transformMat4(luz6,luz6,modelMatrix);
		
		var lucesExternas = gl.getUniformLocation(glProgram, "lucesExternas");
		var l1 = gl.getUniformLocation(glProgram, "l1Position");
		var l2 = gl.getUniformLocation(glProgram, "l2Position");
		var l3 = gl.getUniformLocation(glProgram, "l3Position");
		var l4 = gl.getUniformLocation(glProgram, "l4Position");
		var l5 = gl.getUniformLocation(glProgram, "l5Position");
		var l6 = gl.getUniformLocation(glProgram, "l6Position");
		
		gl.uniform3fv(l1, luz);
		gl.uniform3fv(l2, luz2);
		gl.uniform3fv(l3, luz3);
		gl.uniform3fv(l4, luz4);
		gl.uniform3fv(l5, luz5);
		gl.uniform3fv(l6, luz6);
		
		
		gl.uniform1i(lucesExternas, false);
		this.grilla.draw(modelMatrix);
		gl.uniform1i(lucesExternas, true);
	}

	this.getTapas = function(){
		return this.puntosTapas;
	}
	
	this.getTapas2 = function(){
		return this.puntosTapas2;
	}

	this.inicializar = function()
	{
		this.puntosPolinomio = this.curvas.getPolinomio();
		this.crearEstacionEspacial();
		this.grilla.createIndexBuffer();
		this.grilla.setupWebGLBuffers();                   
	}

}
