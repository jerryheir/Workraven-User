package com.workravenuser;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.arttitude360.reactnative.rnpaystack.RNPaystackPackage;
import com.henninghall.date_picker.DatePickerPackage;
import cl.json.RNSharePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.keychain.KeychainPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new PickerPackage(),
            new RNPaystackPackage(),
            new DatePickerPackage(),
            new RNSharePackage(),
            new RNGestureHandlerPackage(),
            new RNFetchBlobPackage(),
            new KeychainPackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new RNGoogleSigninPackage(),
            new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
