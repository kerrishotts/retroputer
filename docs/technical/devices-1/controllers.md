# Controllers

Controllers allow users to provide directional input and trigger actions without having to remember keyboard commands.

Retroputer supports two controllers.

### Ports

<table>
  <thead>
    <tr>
      <th >Port</th>
      <th >Name</th>
      <th >Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >0x40</td>
      <td >Controller 0 Digital Controller Direction</td>
      <td >
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
      <td >0x41</td>
      <td >Controller 0 Analog Stick Direction</td>
      <td >Direction the analog stick is being pushed (0 - 179); shift left by one
        to obtain the degrees.</td>
    </tr>
    <tr>
      <td >0x42</td>
      <td >Controller 0 Analog Stick Strength</td>
      <td >0 - 255; indicates the strength applied to the stick (255 = fully extended)</td>
    </tr>
    <tr>
      <td >0x43</td>
      <td >Controller 0 Button States</td>
      <td >
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
      <td >0x44</td>
      <td >-</td>
      <td >-</td>
    </tr>
    <tr>
      <td >0x45</td>
      <td ></td>
      <td ></td>
    </tr>
    <tr>
      <td >0x46</td>
      <td ></td>
      <td ></td>
    </tr>
    <tr>
      <td >0x47</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x48</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x59</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x4A</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x4B</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x4C</td>
      <td >-</td>
      <td >-</td>
    </tr>
    <tr>
      <td >0x4D</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x4E</td>
      <td >-</td>
      <td ></td>
    </tr>
    <tr>
      <td >0x4F</td>
      <td >Reset</td>
      <td ></td>
    </tr>
  </tbody>
</table>

### 

