precision mediump float;

uniform float interaction_num;
uniform float Mx; 
uniform float My;
uniform float Roll;

void main(void)
{
  vec2 An1, An;
  float RCoef = abs(150.0 + Roll / 5.0);
 
  vec2 A0 = vec2((gl_FragCoord.x - Mx) / RCoef, (gl_FragCoord.y + My - 500.0) / RCoef);
  
  int n, a = int(interaction_num);

  An = A0;
  
  for (int i = 0; i < 1048576; i++)
  {
  if (i > a)
    break;

  An1.x = An.x * An.x - An.y * An.y + A0.x;
  An1.y = 2.0 * An.x * An.y + A0.y;
  An = An1;
  
  if (An.x * An.x + An.y * An.y >  4.0)
    n = i;
  
  }
  gl_FragColor = vec4(float(n) / 2.0, float(n) / 3.0, float(n) / 8.0, 1.0);
}
