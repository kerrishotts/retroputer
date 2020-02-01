# Memory Layout

Retroputer has access to 512 kilobytes of memory, split up into eight banks of 64 kilobytes each. Only the first bank can contain executable code.

Each bank is then split up into four pages of 16 kilobytes. The initial memory map at boot-up looks like the following:

![Memory Layout at boot-up](../../.gitbook/assets/image%20%2810%29.png)

<table>
  <thead>
    <tr>
      <th style="text-align:left">Bank</th>
      <th style="text-align:left">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">0</td>
      <td style="text-align:left">
        <p>Trap Vectors</p>
        <p>KERNEL Scratch and Sprite Data</p>
        <p>System Stack</p>
        <p>User Code</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">1</td>
      <td style="text-align:left">Screen Memory (by default)</td>
    </tr>
    <tr>
      <td style="text-align:left">2</td>
      <td style="text-align:left">General Purpose Data</td>
    </tr>
    <tr>
      <td style="text-align:left">3</td>
      <td style="text-align:left">General Purpose Data</td>
    </tr>
    <tr>
      <td style="text-align:left">4</td>
      <td style="text-align:left">General Purpose Data</td>
    </tr>
    <tr>
      <td style="text-align:left">5</td>
      <td style="text-align:left">General Purpose Data</td>
    </tr>
    <tr>
      <td style="text-align:left">6</td>
      <td style="text-align:left">General Purpose Data</td>
    </tr>
    <tr>
      <td style="text-align:left">7</td>
      <td style="text-align:left">ROM (Character, Palette, Kernel)</td>
    </tr>
  </tbody>
</table>Each bank is split into four pages, resulting in 32 addressable pages. Pages 28–31 are read-only \(being the entirety of bank 7\). Pages 1–3 in bank 0 can be remapped with the `MM` register. At startup, the first four pages are mapped as follows:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Page</th>
      <th style="text-align:left">Mapping</th>
      <th style="text-align:left">Remappable?</th>
      <th style="text-align:left">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">0</td>
      <td style="text-align:left">0</td>
      <td style="text-align:left">No</td>
      <td style="text-align:left">
        <p>Trap Vectors</p>
        <p>Kernel Scratch and Sprite Data</p>
        <p>Stack</p>
        <p>User Code</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">1</td>
      <td style="text-align:left">1</td>
      <td style="text-align:left">Yes</td>
      <td style="text-align:left">User Code and Data</td>
    </tr>
    <tr>
      <td style="text-align:left">2</td>
      <td style="text-align:left">2</td>
      <td style="text-align:left">Yes</td>
      <td style="text-align:left">User Code and Data</td>
    </tr>
    <tr>
      <td style="text-align:left">3</td>
      <td style="text-align:left">31</td>
      <td style="text-align:left">Yes</td>
      <td style="text-align:left">KERNEL (ROM)</td>
    </tr>
  </tbody>
</table>Because `MM` can be modified with the `PUSHMM` instruction, it is posible to map in code and data from any page in memory. This means that it is possible, with some clever programming, to write programs with much more code than 64 kilobytes.



