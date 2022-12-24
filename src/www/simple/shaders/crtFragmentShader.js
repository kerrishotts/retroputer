// CRT Shader Shamelessly ripped from https://gist.github.com/KHN190/d7c467a471b15e72302b16a9336440a5
export default `
    //precision mediump float;
    precision highp float;

	varying vec2		v_texCoord;
	uniform vec2		u_canvasSize;
	uniform sampler2D	u_texture;

	// PUBLIC DOMAIN CRT STYLED SCAN-LINE SHADER
	//   by Timothy Lottes
	// https://www.shadertoy.com/view/XsjSzR
	//   modified (borked) by ultrabrite

	// Emulated input resolution.
	const vec2 texSize=vec2(640.0,480.0);

	// Hardness of scanline.
	//  -8.0 = soft
	// -16.0 = medium
	float hardScan=-6.0;

	// Hardness of pixels in scanline.
	// -2.0 = soft
	// -4.0 = hard
	const float hardPix=-1.5;

	// Hardness of shadow mask in scanline.
	// 0.5 = hard
	// 3.0 = soft
	const float hardMask=2.0;

	const vec3 compos = vec3(1.0/6.0,1.0/2.0,5.0/6.0);

	// Display warp.
	// 0.0 = none
	// 1.0/8.0 = extreme
	//const vec2 warp=vec2(0,0);
	const vec2 warp=vec2(1.0/48.0,1.0/48.0);

	//------------------------------------------------------------------------

	// Nearest emulated sample given floating point position and texel offset.
	// Also zero's off screen.
	vec3 Fetch(vec2 pos,vec2 off)
	{
        pos=floor(pos * texSize + off) / texSize;
		if (pos.x<0.0 || pos.x>=1.0 || pos.y<0.0 || pos.y>=1.0)
			return vec3(0.0,0.0,0.0);
		return texture2D(u_texture,pos.xy).rgb;
	}

	// Distance in emulated pixels to nearest texel.
	vec2 Dist(vec2 pos)
	{
		pos=pos * texSize;
		return -((pos-floor(pos))-vec2(0.5));
	}

	// 1D Gaussian.
	float Gaus(float pos,float scale)
	{
		return exp2(scale*pos*pos);
	}

	// 3-tap Gaussian filter along horz line.
	vec3 Horz3(vec2 pos,float off)
	{
		mat3 m=mat3(Fetch(pos,vec2(-1.0,off)),
					Fetch(pos,vec2( 0.0,off)),
					Fetch(pos,vec2( 1.0,off)));
		float dst=Dist(pos).x;
		// Convert distance to weight.
		vec3 v=vec3(Gaus(dst-1.0,hardPix),
					Gaus(dst+0.0,hardPix),
					Gaus(dst+1.0,hardPix));
			// Return filtered sample.
			return (m*v)/(v.x+v.y+v.z);
	}

	// 5-tap Gaussian filter along horz line.
	vec3 Horz5(vec2 pos,float off)
	{
		vec3 a=Fetch(pos,vec2(-2.0,off));
		vec3 b=Fetch(pos,vec2(-1.0,off));
		vec3 c=Fetch(pos,vec2( 0.0,off));
		vec3 d=Fetch(pos,vec2( 1.0,off));
		vec3 e=Fetch(pos,vec2( 2.0,off));
		float dstx=Dist(pos).x;
		// Convert distance to weight.
		float wa=Gaus(dstx-2.0,hardPix);
		float wb=Gaus(dstx-1.0,hardPix);
		float wc=Gaus(dstx+0.0,hardPix);
		float wd=Gaus(dstx+1.0,hardPix);
		float we=Gaus(dstx+2.0,hardPix);
		// Return filtered sample.
		return (a*wa+b*wb+c*wc+d*wd+e*we)/(wa+wb+wc+wd+we);
	}

	// Allow nearest three lines to effect pixel.
	vec3 Tri(vec2 pos)
	{
		mat3 m=mat3(Horz3(pos,-1.0),
					Horz5(pos, 0.0),
					Horz3(pos, 1.0));
		float dsty=Dist(pos).y;
		vec3 v=vec3(Gaus(dsty-1.0,hardScan),
					Gaus(dsty+0.0,hardScan),
					Gaus(dsty+1.0,hardScan));
		return m*v;
	}

	// Distortion of scanlines, and end of screen alpha.
	vec2 Warp(vec2 pos)
	{
		pos=pos*2.0-1.0;
		pos*=1.0+vec2(pos.y*pos.y,pos.x*pos.x)*warp;
		return pos*0.5+0.5;
	}

	vec3 Mask(float x)
	{
		vec3 v  = clamp((fract(x)-compos)*hardMask,-1.0/3.0,1.0/3.0);
		return 2.0/3.0+abs(v);
	}

	void main()
	{
		gl_FragColor.rgb = Tri(Warp(v_texCoord.xy))*Mask(v_texCoord.x*texSize.x);
		//gl_FragColor.rgb = texture2D(u_texture,v_texCoord.xy).rgb;
		gl_FragColor.a = 1.0;
    }
`;