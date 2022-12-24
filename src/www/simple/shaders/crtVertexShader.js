// CRT Shader Shamelessly ripped from https://gist.github.com/KHN190/d7c467a471b15e72302b16a9336440a5
export default `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying   vec2 v_texCoord;
void main()
{
    gl_Position = vec4(a_position.x, a_position.y, 0, 1);
    v_texCoord = a_texCoord;
}
`;