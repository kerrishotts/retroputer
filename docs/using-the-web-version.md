# Using the Web Version

The Web Version of Retroputer makes it easy to get a feel for how Retroputer works. It's a completely integrated development environment, including the ability to see the current state of the machine, the contents of memory, the I/O bus, and an assembler. 

![The web version of Retroputer](./images/web-interface.png)

> **Note**
>
> Retroputer's emulation speed depends upon the performance capabilities of your browser and computer processor. Code written for Retroputer assumes that it is running at roughly 1MHz and that the VGU is creating roughly 60 frames per second.
>
> If your browser does not match this performance, Retroputer may feel slow to you.

## The Workspace

Retroputer's workspace is a collection of dockable, resizable panels that can be maximized and restored as you desire. This allows you to change the workspace to something that suits the needs at hand.

By default, there are several panels present:

* The **Control** panel controls if the Retroputer processor and other accessories are running, as well as the various performance characteristics of the emulation.
* The **FPS** panel indicates how often the VGU is able to generate a frame \(and how well the browser is coping with frame generation in general\).
* The **State** panel indicates the machine's current status.
* The **Code** panel allows you to enter Assembly language code and assemble it into memory.
* The **Memory** panel displays the current contents of Retroputer's RAM and ROM. It updates automatically every second.
* The **I/O** panel displays the current readings of the I/O bus.
* The **Screen** panel renders the frame generated by the VGU.
* The **Console** panel renders any content sent to Retroputer's console \(not the same as the screen\).
* The **Documentation** panel renders Retroputer's documentation within the app.

### The Control Panel

The **Control** panel is used to start, pause, and single-step the Retroputer's processor. It is also used to configure performance characteristics of the emulation while not single-stepping.

There are several fields available that control the execution of Retroputer:

* The **Starting Address** indicates the first instruction that will be executed when Retroputer is started \(using the **Start** button\). It also specifies the instruction that will be pointed to when the **Jump** button is clicked. The default value is `0x0FF00`, which is the `INIT` vector.
* **Start** will jump to the **Starting Address** and begin running the Retroputer from there. Execution continues until the machine encounters a `BRK` \(break\) instruction or until manually stopped by clicking the **Stop** or **Step** buttons.
* **Continue** will continue execution from the last place before being stopped. 
* **Stop** will stop execution of the Retroputer processor immediately. The VGU continues to execute for a couple more frames just to ensure that you can see any output that may have been generated before the completion of a frame.
* **Jump** will set `PC` to the **Starting Address** value. Most useful with **Step** and **Continue**.
* **Step** will execute the next instruction and **stop**.
* **Randomize** assigns random values to all of RAM \(excluding ROM\).

There are also several fields that control the performance characteristics of Retroputer:

* **Mode** indicates if the emulator should execute a **fixed** number of instructions per slice \(roughly a single frame\), or if the emulator is free to maximize the number of instructions per slice \(while trying to target 60fps\) – this value is called **auto**. The default value is `fixed`.
* The **Slice Granularity** behaves differently depending upon the selected **Mode**.
  * When **Mode** is **fixed**, this number of instructions will _always_ be executed per slice – no more, no less. \(Unless a `BRK` is encountered.\) The default value is `4192`.
  * When **Mode** is **auto**, this specifies the number of instructions to execute _before_ checking to see if there's additional time available in the slice to process more instructions. Because the act of checking the time itself takes time, it can be slower to check every instruction if there's still time. The default value here is `255`.
* The **Ticks Between Raster** field indicates how many processor ticks occur before the next VGU update. The default mode is to render a VGU frame all at once, but this isn't as accurate. It's more accurate to render a VGU frame _as_ the processor is working, but this is significantly slower. The default value is **Auto**, indicating that the processor will be given as much time as possible, while also trying to generate a full frame every 60th of a second.
* The **Apply** button applies any changes to the performance characteristics.

### The FPS Panel

The FPS panel indicates the frames-per-second that Retroputer is achieving. The first graph shows how rapidly the browser is able to apply frames from the VGU to the browser canvas \(the target here should always be 60fps\). The second graph shows how many frames are being generated from the VGU. Ideally this is always the same as the first graph, but if it's lower, it can indicate that the VGU and processor emulation are taking too much time and causing slower frame output.

### The State Panel

The **State** panel lets you take a look into the processor state. You can request a single update simply by clicking the **Refresh** button, or you can start a continuous stream of updates by clicking the **Play** button \(which turns into a **Stop** button\).

### The Code Panel



### The Memory Panel

### The I/O Panel

### The Screen panel

### The Console Panel

### The Documentation Panel

## Starting Retroputer

![Retroputer&apos;s Launch Screen with BASIC running](./images/basic-greeting.png)





