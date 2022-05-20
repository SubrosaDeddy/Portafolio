Texture2D colorMap : register(t0);
Texture2D colorMap2 : register(t1);
Texture2D blendMap : register(t2);
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

cbuffer gener : register(b3)
{
	float4 generales;
};

cbuffer ambient : register(b4)
{
	float4 ambient;
};

cbuffer diffuse : register(b5)
{
	float4 diffuse;
};

struct VS_Input
{
	float4 pos : POSITION;
	float2 tex0 : TEXCOORD0;
	float2 blendTex : TEXCOORD1;
	float3 normal : NORMAL0;
	float3 tangente : NORMAL1;
	float3 binormal : NORMAL2;
};

struct PS_Input
{
	float4 pos : SV_POSITION;
	float2 tex0 : TEXCOORD0;
	float2 blendTex : TEXCOORD1;
	float2 generales: TEXCOORD2;
	float4 ambient: TEXCOORD3;
	float4 diffuse: TEXCOORD4;
	float3 normal : NORMAL0;
	float3 tangent : NORMAL1;
	float3 binorm : NORMAL2;
};

PS_Input VS_Main(VS_Input vertex)
{
	PS_Input vsOut = (PS_Input)0;
	vsOut.pos = mul(vertex.pos, worldMatrix);
	vsOut.pos = mul(vsOut.pos, viewMatrix);
	vsOut.pos = mul(vsOut.pos, projMatrix);

	vsOut.tex0 = vertex.tex0;
	vsOut.blendTex = vertex.blendTex;
	vsOut.normal = normalize(mul(vertex.normal, worldMatrix));
	vsOut.tangent = normalize(mul(vertex.tangente, worldMatrix));
	vsOut.binorm = normalize(mul(vertex.binormal, worldMatrix));

	vsOut.generales = generales;

	vsOut.ambient = ambient;
	vsOut.diffuse = diffuse;
	return vsOut;
}

float4 PS_Main(PS_Input pix) : SV_TARGET
{
	float3 ambient = pix.ambient.rgb * pix.ambient.a*0.2;
	float3 diffuse = pix.diffuse.rgb * pix.diffuse.a;

	float4 text = colorMap.Sample(colorSampler, pix.tex0);
	float4 text2 = colorMap2.Sample(colorSampler, pix.tex0);
	float4 textBlend = blendMap.Sample(colorSampler, pix.tex0);

	float alphaBlend = dot(pix.normal, normalize(pix.generales));
	float4 textf = (text * alphaBlend) + ((1.0 - alphaBlend) * text2 * 0.7);
	textf = saturate(textf);
	
	float4 fColor = float4(ambient + textf.rgb * alphaBlend, 1.0f);

	return fColor;
}