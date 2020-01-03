# Controllers

Controllers allow users to provide directional input and trigger actions without having to remember keyboard commands.

Retroputer supports two controllers.

### Ports

<table>
  <thead>
    <tr>
      <th style="text-align:left">Port</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">0x40</td>
      <td style="text-align:left">Controller 0 Digital Controller Direction</td>
      <td style="text-align:left">
        <p><code>....nsew</code> 
        </p>
        <p></p>
        <ul>
          <li><code>n</code> - north, if set</li>
          <li><code>s</code> - south if set</li>
          <li><code>e</code> - east, if set</li>
          <li><code>w</code> - west if set</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">0x41</td>
      <td style="text-align:left">Controller 0 Analog Stick Direction</td>
      <td style="text-align:left">Direction the analog stick is being pushed (0 - 179); shift left by one
        to obtain the degrees.</td>
    </tr>
    <tr>
      <td style="text-align:left">0x42</td>
      <td style="text-align:left">Controller 0 Analog Stick Strength</td>
      <td style="text-align:left">0 - 255; indicates the strength applied to the stick (255 = fully extended)</td>
    </tr>
    <tr>
      <td style="text-align:left">0x43</td>
      <td style="text-align:left">Controller 0 Button States</td>
      <td style="text-align:left">
        <p><code>..lrxyab</code>
        </p>
        <ul>
          <li><code>l</code> left trigger</li>
          <li><code>r</code> right trigger</li>
          <li><code>x</code> x button</li>
          <li><code>y</code> y button</li>
          <li><code>a</code> a button</li>
          <li><code>b</code> b button</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">0x44</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left">0x45</td>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x46</td>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x47</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x48</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x59</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x4A</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x4B</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x4C</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left">0x4D</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x4E</td>
      <td style="text-align:left">-</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">0x4F</td>
      <td style="text-align:left">Reset</td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

### 

