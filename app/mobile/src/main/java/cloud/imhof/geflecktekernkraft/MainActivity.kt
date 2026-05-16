package cloud.imhof.geflecktekernkraft

import android.app.Activity
import android.os.Bundle
import android.view.MotionEvent
import android.window.OnBackInvokedDispatcher
import androidx.core.view.InputDeviceCompat
import androidx.core.view.MotionEventCompat
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.tasm.provider.LynxProviderRegistry
import imhof.cloud.geflecktekernkraft.FontResourceProvider

class MainActivity : Activity() {
    private lateinit var lynxView: LynxView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lynxView = buildLynxView()
        runOnUiThread {
            lynxView.setOnGenericMotionListener{ _, ev ->
                if (ev.action == MotionEvent.ACTION_SCROLL &&
                    ev.isFromSource(InputDeviceCompat.SOURCE_ROTARY_ENCODER)
                ) {
                    val delta = ev.getAxisValue(MotionEventCompat.AXIS_SCROLL)

                    if (delta < 0) {
                        lynxView.getJSModule("scrollHandler").fire("up", null)
                    } else {
                        lynxView.getJSModule("scrollHandler").fire("down", null)
                    }
                    true
                } else {
                    false
                }
            }
            lynxView.requestFocus()
        }
        setContentView(lynxView)
        onBackInvokedDispatcher.registerOnBackInvokedCallback(
            OnBackInvokedDispatcher.PRIORITY_DEFAULT,
        ) {
            lynxView.getJSModule("backHandler").fire("back", null)
        }
        val uri = "main.lynx.bundle"
        lynxView.renderTemplateUrl(uri, "")
    }

    private fun buildLynxView(): LynxView {
        val viewBuilder = LynxViewBuilder()
        viewBuilder.setTemplateProvider(TemplateProvider(this))
        viewBuilder.setResourceProvider(LynxProviderRegistry.LYNX_PROVIDER_TYPE_FONT, FontResourceProvider())
        return viewBuilder.build(this)
    }
}