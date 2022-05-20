Texture2D colorMap : register(t0);
Texture2D normalMap : register(t1);
Texture2D specMap : register(t2);

SamplerState colorSampler : register(s0);

cbuffer cbChangerEveryFrame : register(b0)
{
	matrix worldMatrix;
};

cbuffer cbNeverChanges : register(b1)
{
	matrix viewMatrix;
};

cbuffer cbChangeOnResize : register(b2)
{
	matrix projMatrix;
};

cbuffer cbChangesOccasionally : register(b3)
{
	float3 cameraPos;
};

cbuffer cbChangesOccasionally : register(b4)
{
	float specForce;
};

cbuffer gener : register(b5)
{
	float4 generales;
};

cbuffer diff : register(b6)
{
	float4 diffLight;
};

cbuffer amb : register(b7)
{
	float4 ambientLight;
};

struct VS_Input
{
	float4 pos : POSITION;
	float2 tex0 : TEXCOORD0;
	float3 normal : NORMAL0;
	float3 tangente : TANGENT0;
};

struct PS_Input
{
	float4 pos : SV_POSITION;
	float2 tex0 : TEXCOORD0;
	float3 normal : TEXCOORD1;
	float3 generales : TEXCOORD4;
	float3 camPos : TEXCOORD5;
	float3 posi : TEXCOORD6;
	float4 diffuse : TEXCOORD7;
	float4 ambient : TEXCOORD2;
};

PS_Input VS_Main(VS_Input vertex)
{

	float4 worldPosition;

	PS_Input vsOut = (PS_Input)0;
	vsOut.pos = mul(vertex.pos, worldMatrix);
	vsOut.posi = vsOut.pos.xyz;
	vsOut.pos = mul(vsOut.pos, viewMatrix);
	vsOut.pos = mul(vsOut.pos, projMatrix);

	vsOut.tex0 = vertex.tex0;

	worldPosition = mul(vertex.pos, worldMatrix);
	
	//vsOut.tangente = normalize(mul(vertex.tangente, worldMatrix));
	vsOut.normal = normalize(mul(vertex.normal, worldMatrix));
	/*vsOut.tangente = normalize(vsOut.tangente - vsOut.normal * dot(vsOut.normal, vsOut.tangente));
	vsOut.binormal = normalize(cross(vsOut.normal, vsOut.tangente));*/

	vsOut.camPos = cameraPos.xyz - worldPosition.xyz;
	vsOut.camPos = normalize(vsOut.camPos);
	//vsOut.specForce = specForce;

	vsOut.generales = generales;

	vsOut.diffuse = diffLight;
	vsOut.ambient = ambientLight;
	return vsOut;
}

float4 PS_Main(PS_Input pix) : SV_TARGET
{
	float4 colorAmbiental = pix.ambient;
	float3 vecVista = pix.posi - pix.camPos;
	float3 lightDir = normalize(float3(pix.generales.x, pix.generales.y, pix.generales.z)); // lightDirection

	float4 textColor = colorMap.Sample(colorSampler, pix.tex0);

	//Aportación ambiental
	float FAA = colorAmbiental.a;
	float aportAmbiental = colorAmbiental * FAA;// ambient color

	//Aportación difusa
	float4 luzDifusa = pix.diffuse;
	float FAD = pix.diffuse.a;

	float4 textNorm = normalMap.Sample(colorSampler, pix.tex0);
	float3 bump = normalize(2.0 * textNorm - 1.0);
	bump = mul(bump, pix.normal);

	float FALL = dot(bump, lightDir);

	float4 aportDifusa = saturate(luzDifusa * FALL * FAD);

	//Aportáción especular (roughness)
	float4 specularColor = { 1, 1, 1, 1 };
	float FAS = 0.3;
	float4 textSpec = specMap.Sample(colorSampler, pix.tex0);

	// Calculate the reflection vector based on the light intensity, normal vector, and light direction.
	float3 reflection = normalize(2 * FALL * bump - lightDir);
	float specularity = pow(saturate(dot(reflection, vecVista)), 20);
	float4 aportEspecular = specularColor * FAS * specularity * (1-textSpec);

	textColor = textColor * (aportAmbiental + aportDifusa + aportEspecular);
	return textColor;
}